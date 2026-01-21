import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Play,
  ArrowLeft,
  Settings,
  RotateCcw,
  AlertTriangle,
  Info,
  Trophy,
  Crown,
} from 'lucide-react';

// ============ Firebase 初始化 ============
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDRjxIWJc5BabyvRbhR6uZ8ZaO3J70OKfc',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'eoelior-17bed.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'eoelior-17bed',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'eoelior-17bed.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '722816989754',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:722816989754:web:e6ce3c57198d6bb7769303',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const APP_ID = 'lottery-rafflebox';

// ============ 工具函數 ============

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// ============ UI 組件 ============

const Alert = ({ title, message, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full mx-4">
      <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
        <Info className="w-5 h-5 text-cyan-400" />
        {title}
      </h3>
      <p className="text-slate-300 mb-6">{message}</p>
      <button
        onClick={onClose}
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 rounded-lg transition-colors">
        確定
      </button>
    </div>
  </div>
);

const Confirm = ({ title, message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full mx-4">
      <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-yellow-500" />
        {title}
      </h3>
      <p className="text-slate-300 mb-6">{message}</p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 rounded-lg transition-colors">
          取消
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition-colors">
          確認
        </button>
      </div>
    </div>
  </div>
);

const Confetti = ({ active }) => {
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {[...Array(80)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-5%',
            backgroundColor: ['#06b6d4', '#0ea5e9', '#3b82f6', '#8b5cf6', '#ec4899'][
              Math.floor(Math.random() * 5)
            ],
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 20 + 10}px`,
            animationDuration: `${Math.random() * 2 + 2}s`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
};

// ============ 主應用 ============

export default function App() {
  // ---- 狀態 ----
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('display'); // display | admin | results
  const [alert, setAlert] = useState(null);
  const [confirm, setConfirm] = useState(null);

  // 數據
  const [config, setConfig] = useState({ title: '年末狂歡會' });
  const [prizes, setPrizes] = useState([]);
  const [tickets, setTickets] = useState([]);

  // 抽獎狀態
  const [selectedPrizeId, setSelectedPrizeId] = useState(null);
  const [drawCount, setDrawCount] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentWinners, setCurrentWinners] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  // 後台編輯
  const [editingPrizeId, setEditingPrizeId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editQty, setEditQty] = useState('');
  const [newPrizeName, setNewPrizeName] = useState('');
  const [newPrizeQty, setNewPrizeQty] = useState('');

  // ---- Firebase 初始化 ----
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        try {
          await signInAnonymously(auth);
        } catch (error) {
          console.error('Auth error:', error);
        }
      }
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  // ---- 實時數據同步 ----
  useEffect(() => {
    if (!user) return;

    // 配置
    const configUnsub = onSnapshot(
      doc(db, 'artifacts', APP_ID, 'public', 'data', 'config', 'main'),
      (snap) => {
        if (snap.exists()) setConfig(snap.data());
        else setDoc(snap.ref, { title: '年末狂歡會' });
      }
    );

    // 獎項
    const prizesUnsub = onSnapshot(
      collection(db, 'artifacts', APP_ID, 'public', 'data', 'prizes'),
      (snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        data.sort((a, b) => (a.order || 0) - (b.order || 0));
        setPrizes(data);
      }
    );

    // 彩票
    const ticketsUnsub = onSnapshot(
      collection(db, 'artifacts', APP_ID, 'public', 'data', 'tickets'),
      (snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        data.sort((a, b) => {
          const numA = parseInt(a.number) || 0;
          const numB = parseInt(b.number) || 0;
          return numA - numB;
        });
        setTickets(data);
      }
    );

    return () => {
      configUnsub();
      prizesUnsub();
      ticketsUnsub();
    };
  }, [user]);

  // ---- 邏輯函數 ----

  const getAvailableTickets = () => tickets.filter((t) => !t.isWinner);

  const getPrizeRemaining = (prize) => Math.max(0, prize.quantity - (prize.winners?.length || 0));

  const showAlertDialog = (title, message) => {
    setAlert({ title, message });
  };

  const showConfirmDialog = (title, message, onConfirm) => {
    setConfirm({ title, message, onConfirm });
  };

  // ---- 獎項管理 ----

  const addPrize = async (name, qty) => {
    if (!name || !qty || qty <= 0) {
      showAlertDialog('錯誤', '請輸入有效的獎項名稱和人數');
      return;
    }
    try {
      await setDoc(doc(collection(db, 'artifacts', APP_ID, 'public', 'data', 'prizes')), {
        name,
        quantity: parseInt(qty),
        winners: [],
        order: Date.now(),
        createdAt: serverTimestamp(),
      });
      setNewPrizeName('');
      setNewPrizeQty('');
      showAlertDialog('成功', '獎項已新增');
    } catch (error) {
      showAlertDialog('錯誤', '新增失敗：' + error.message);
    }
  };

  const updatePrize = async (id, name, qty) => {
    if (!name || !qty || qty <= 0) return;
    try {
      await updateDoc(doc(db, 'artifacts', APP_ID, 'public', 'data', 'prizes', id), {
        name,
        quantity: parseInt(qty),
      });
      setEditingPrizeId(null);
    } catch (error) {
      showAlertDialog('錯誤', '編輯失敗');
    }
  };

  const deletePrize = async (id) => {
    try {
      await deleteDoc(doc(db, 'artifacts', APP_ID, 'public', 'data', 'prizes', id));
      showAlertDialog('成功', '獎項已刪除');
    } catch (error) {
      showAlertDialog('錯誤', '刪除失敗');
    }
  };

  // ---- 彩票管理 ----

  const generateTickets = async (start, end) => {
    const startNum = parseInt(start);
    const endNum = parseInt(end);
    if (isNaN(startNum) || isNaN(endNum) || startNum > endNum) {
      showAlertDialog('錯誤', '請輸入有效的範圍');
      return;
    }
    const count = endNum - startNum + 1;
    if (count > 500) {
      showAlertDialog('錯誤', '一次最多生成 500 張');
      return;
    }
    try {
      const batch = writeBatch(db);
      for (let i = startNum; i <= endNum; i++) {
        const num = i.toString().padStart(3, '0');
        if (!tickets.find((t) => t.number === num)) {
          const ref = doc(collection(db, 'artifacts', APP_ID, 'public', 'data', 'tickets'));
          batch.set(ref, {
            number: num,
            isWinner: false,
            createdAt: serverTimestamp(),
          });
        }
      }
      await batch.commit();
      showAlertDialog('成功', `已生成 ${count} 張彩票`);
    } catch (error) {
      showAlertDialog('錯誤', '生成失敗');
    }
  };

  // ---- 抽獎流程 ----

  const executeDraw = async () => {
    if (!selectedPrizeId || drawCount <= 0) return;

    const prize = prizes.find((p) => p.id === selectedPrizeId);
    if (!prize) return;

    const remaining = getPrizeRemaining(prize);
    if (remaining <= 0 || drawCount > remaining) {
      showAlertDialog('錯誤', `此獎項剩餘名額僅有 ${remaining} 個`);
      return;
    }

    const available = getAvailableTickets();
    if (available.length < drawCount) {
      showAlertDialog('錯誤', `可用彩票不足`);
      return;
    }

    setIsDrawing(true);
    setCurrentWinners([]);

    try {
      // 初始化動畫狀態
      const animators = Array(drawCount)
        .fill(0)
        .map(() => ({ number: '000', locked: false }));
      setCurrentWinners(animators);

      // 等待頁面切換
      await delay(300);

      // 滾動動畫
      let isSpinning = true;
      const interval = setInterval(() => {
        if (!isSpinning) {
          clearInterval(interval);
          return;
        }
        setCurrentWinners((prev) =>
          prev.map((item) => ({
            ...item,
            number: item.locked ? item.number : Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
          }))
        );
      }, 50);

      await delay(2000);
      isSpinning = false;
      clearInterval(interval);

      // 隨機選擇中獎者
      const shuffled = shuffle(available);
      const winners = shuffled.slice(0, drawCount);
      const winnerNumbers = winners.map((w) => w.number);

      // 逐一鎖定
      for (let i = 0; i < drawCount; i++) {
        setCurrentWinners((prev) => {
          const next = [...prev];
          next[i] = { number: winnerNumbers[i], locked: true };
          return next;
        });
        await delay(600);
      }

      // 更新 Firebase
      const batch = writeBatch(db);

      // 更新彩票
      winners.forEach((w) => {
        batch.update(doc(db, 'artifacts', APP_ID, 'public', 'data', 'tickets', w.id), {
          isWinner: true,
          wonPrizeId: selectedPrizeId,
        });
      });

      // 更新獎項
      const updatedWinners = [...(prize.winners || []), ...winnerNumbers];
      batch.update(doc(db, 'artifacts', APP_ID, 'public', 'data', 'prizes', selectedPrizeId), {
        winners: updatedWinners,
      });

      await batch.commit();

      // 顯示禮花
      await delay(1000);
      setShowConfetti(true);
      setPage('results');
    } catch (error) {
      showAlertDialog('錯誤', '抽獎失敗：' + error.message);
    } finally {
      setIsDrawing(false);
    }
  };

  // ---- 選擇獎項 ----

  const selectPrize = (prize) => {
    const remaining = getPrizeRemaining(prize);
    if (remaining <= 0) {
      showAlertDialog('錯誤', '此獎項已抽完');
      return;
    }
    setSelectedPrizeId(prize.id);
    setDrawCount(1);
    setPage('draw');
  };

  // ---- 頁面渲染 ----

  if (!user) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-950">
        <div className="text-2xl text-cyan-400 font-mono animate-pulse">初始化中...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-slate-950 to-slate-900 relative">
      {/* 禮花 */}
      <Confetti active={showConfetti} />

      {/* 頁面內容 */}
      <div className="flex-1 overflow-hidden">
        {page === 'display' && <DisplayPage prizes={prizes} onSelectPrize={selectPrize} config={config} onAdmin={() => setPage('admin')} />}
        {page === 'admin' && <AdminPage prizes={prizes} tickets={tickets} onBack={() => setPage('display')} />}
        {page === 'draw' && (
          <DrawPage
            prize={prizes.find((p) => p.id === selectedPrizeId)}
            currentWinners={currentWinners}
            drawCount={drawCount}
            setDrawCount={setDrawCount}
            isDrawing={isDrawing}
            onExecuteDraw={executeDraw}
            onBack={() => setPage('display')}
            remaining={getPrizeRemaining(prizes.find((p) => p.id === selectedPrizeId) || {})}
            availableCount={getAvailableTickets().length}
          />
        )}
        {page === 'results' && (
          <ResultsPage
            prize={prizes.find((p) => p.id === selectedPrizeId)}
            winners={currentWinners}
            onContinue={() => {
              setShowConfetti(false);
              setPage('display');
              setSelectedPrizeId(null);
            }}
          />
        )}
      </div>

      {/* 對話框 */}
      {alert && <Alert {...alert} onClose={() => setAlert(null)} />}
      {confirm && (
        <Confirm
          {...confirm}
          onConfirm={() => {
            confirm.onConfirm();
            setConfirm(null);
          }}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}

// ============ 頁面組件 ============

const DisplayPage = ({ prizes, onSelectPrize, config, onAdmin }) => {
  const grand = prizes.filter((p) => p.isGrandPrize);
  const normal = prizes.filter((p) => !p.isGrandPrize);

  return (
    <div className="w-full h-full flex flex-col p-6">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
          {config.title || '年末狂歡會'}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
        {/* 最大獎 */}
        {grand.map((prize) => {
          const remaining = Math.max(0, prize.quantity - (prize.winners?.length || 0));
          const isDone = remaining === 0;
          return (
            <button
              key={prize.id}
              onClick={() => onSelectPrize(prize)}
              disabled={isDone}
              className={`p-6 rounded-2xl border-2 transition-all text-left ${
                isDone
                  ? 'bg-slate-900/50 border-slate-700 opacity-50 cursor-not-allowed'
                  : 'bg-gradient-to-br from-yellow-900/30 to-slate-900 border-yellow-500/50 hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(250,204,21,0.3)]'
              }`}>
              <div className="flex items-center gap-2 mb-3">
                <Crown className="w-6 h-6 text-yellow-400" />
                <span className="text-xl font-bold text-yellow-300">{prize.name}</span>
              </div>
              <div className="text-3xl font-black text-yellow-400">{remaining}</div>
              <div className="text-sm text-slate-400 mt-2">{isDone ? '已完成' : '名額'}</div>
            </button>
          );
        })}

        {/* 普通獎 */}
        {normal.map((prize) => {
          const remaining = Math.max(0, prize.quantity - (prize.winners?.length || 0));
          const isDone = remaining === 0;
          return (
            <button
              key={prize.id}
              onClick={() => onSelectPrize(prize)}
              disabled={isDone}
              className={`p-6 rounded-2xl border-2 transition-all text-left ${
                isDone
                  ? 'bg-slate-900/50 border-slate-700 opacity-50 cursor-not-allowed'
                  : 'bg-gradient-to-br from-slate-800 to-slate-900 border-cyan-500/50 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]'
              }`}>
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-6 h-6 text-cyan-400" />
                <span className="text-xl font-bold text-cyan-300">{prize.name}</span>
              </div>
              <div className="text-3xl font-black text-cyan-400">{remaining}</div>
              <div className="text-sm text-slate-400 mt-2">{isDone ? '已完成' : '名額'}</div>
            </button>
          );
        })}
      </div>

      <button
        onClick={onAdmin}
        className="absolute top-6 right-6 bg-slate-800 hover:bg-slate-700 text-cyan-400 p-3 rounded-full transition-colors">
        <Settings className="w-6 h-6" />
      </button>
    </div>
  );
};

const AdminPage = ({ prizes, tickets, onBack }) => {
  return (
    <div className="w-full h-full flex flex-col p-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="text-cyan-400 hover:text-cyan-300">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-3xl font-bold text-cyan-400">後台管理</h2>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none grid grid-cols-2 gap-8">
        {/* 獎項管理 */}
        <div className="border border-slate-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">獎項管理</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-none mb-4">
            {prizes.map((prize) => (
              <div key={prize.id} className="bg-slate-800 p-3 rounded-lg flex items-center justify-between">
                <span className="text-sm">{prize.name} x{prize.quantity}</span>
                <button className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="獎項名稱"
              className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm"
            />
            <input
              type="number"
              placeholder="人數"
              className="w-20 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm"
            />
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 彩票管理 */}
        <div className="border border-slate-700 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">彩票管理</h3>
          <div className="text-sm text-slate-400 mb-4">
            總數: {tickets.length} | 未中: {tickets.filter((t) => !t.isWinner).length}
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-slate-400 block mb-1">生成範圍</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="開始"
                  className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm"
                />
                <input
                  type="number"
                  placeholder="結束"
                  className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm"
                />
                <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded text-sm font-bold">
                  生成
                </button>
              </div>
            </div>
            <button className="w-full bg-red-900/50 hover:bg-red-900 text-red-400 py-2 rounded text-sm font-bold border border-red-700">
              清空所有
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DrawPage = ({ prize, currentWinners, drawCount, setDrawCount, isDrawing, onExecuteDraw, onBack, remaining, availableCount }) => {
  if (isDrawing) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center relative">
        {/* 背景 */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 via-slate-950 to-slate-950" />

        {/* 標題 */}
        <div className="relative z-10 mb-12">
          <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 animate-pulse">
            ⚡ DRAWING ⚡
          </h2>
        </div>

        {/* 號碼卡片 */}
        <div className="relative z-10 flex flex-wrap justify-center gap-8 px-4">
          {currentWinners.map((w, i) => (
            <div key={i} className="relative">
              <div
                className={`w-80 h-80 rounded-3xl flex items-center justify-center relative overflow-hidden border-4 transition-all duration-300 ${
                  w.locked
                    ? 'border-yellow-300 shadow-[0_0_100px_rgba(250,204,21,0.8)] bg-gradient-to-br from-yellow-900/30 to-slate-900'
                    : 'border-cyan-400 shadow-[0_0_60px_rgba(6,182,212,0.5)] bg-gradient-to-br from-slate-900 to-slate-950'
                }`}>
                {/* 內層邊框 */}
                <div className="absolute inset-2 rounded-2xl border border-cyan-400/30" />

                {/* 號碼 */}
                <div className="relative z-20 text-center">
                  <div className="text-9xl font-black font-mono drop-shadow-[0_0_50px_rgba(255,255,255,0.8)]">
                    <span className={w.locked ? 'text-yellow-200' : 'text-cyan-100'}>{w.number}</span>
                  </div>
                  <div className="mt-4 text-lg font-bold tracking-widest">
                    {w.locked ? '🎊 LOCKED 🎊' : '🎲 SPINNING 🎲'}
                  </div>
                </div>

                {/* 動畫層 */}
                {!w.locked && <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/5 via-transparent to-blue-400/5 animate-pulse" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-8">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={onBack} className="text-cyan-400 hover:text-cyan-300">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-3xl font-bold text-cyan-400">{prize?.name}</h2>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-12 max-w-2xl w-full">
          {/* 統計 */}
          <div className="grid grid-cols-3 gap-8 mb-12 text-center">
            <div>
              <div className="text-sm text-slate-400 mb-2">剩餘名額</div>
              <div className="text-5xl font-black text-cyan-400">{remaining}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-2">可用彩票</div>
              <div className="text-5xl font-black text-green-400">{availableCount}</div>
            </div>
            <div>
              <div className="text-sm text-slate-400 mb-2">本次抽出</div>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setDrawCount(Math.max(1, drawCount - 1))}
                  disabled={drawCount <= 1}
                  className="w-12 h-12 rounded-full bg-slate-700 hover:bg-slate-600 text-white font-bold disabled:opacity-50">
                  −
                </button>
                <input
                  type="number"
                  value={drawCount}
                  onChange={(e) => {
                    const val = Math.max(1, Math.min(parseInt(e.target.value) || 1, remaining));
                    setDrawCount(val);
                  }}
                  className="w-24 bg-slate-900 border border-slate-600 rounded text-3xl text-center text-white font-bold"
                />
                <button
                  onClick={() => setDrawCount(Math.min(remaining, drawCount + 1))}
                  disabled={drawCount >= remaining}
                  className="w-12 h-12 rounded-full bg-slate-700 hover:bg-slate-600 text-white font-bold disabled:opacity-50">
                  +
                </button>
              </div>
            </div>
          </div>

          {/* 快速按鈕 */}
          <div className="grid grid-cols-4 gap-3 mb-12">
            {[1, 3, 5, 10].map((num) => (
              <button
                key={num}
                onClick={() => setDrawCount(Math.min(num, remaining))}
                disabled={num > remaining}
                className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-cyan-400 font-bold py-3 rounded-lg">
                抽 {num} 個
              </button>
            ))}
          </div>

          {/* 開始按鈕 */}
          <button
            onClick={onExecuteDraw}
            disabled={remaining <= 0 || drawCount <= 0}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl text-2xl flex items-center justify-center gap-3 transition-all">
            <Play className="w-6 h-6" fill="currentColor" />
            開始抽獎
          </button>
        </div>
      </div>
    </div>
  );
};

const ResultsPage = ({ prize, winners, onContinue }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-black text-yellow-400 mb-4">{prize?.name}</h2>
        <div className="text-3xl text-yellow-300 font-bold">得主名單</div>
      </div>

      <div className="flex flex-wrap justify-center gap-8 mb-12 max-h-96 overflow-y-auto scrollbar-none">
        {winners.map((w, i) => (
          <div
            key={i}
            className="w-56 h-56 bg-gradient-to-br from-yellow-900/40 to-slate-900 border-4 border-yellow-400/80 rounded-3xl flex items-center justify-center shadow-[0_0_80px_rgba(250,204,21,0.6)] animate-drop-in"
            style={{ animationDelay: `${i * 0.15}s` }}>
            <div className="text-center">
              <div className="text-7xl font-black text-yellow-200 font-mono drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]">
                {w.number}
              </div>
              <div className="mt-3 text-yellow-300 font-bold text-sm">恭喜中獎</div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onContinue}
        className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-12 py-4 rounded-xl text-lg transition-colors">
        繼續抽獎
      </button>
    </div>
  );
};
