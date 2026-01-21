import React, { useState, useEffect, useMemo, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithCustomToken,
  signInAnonymously,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import {
  Settings,
  Trophy,
  Ticket,
  Trash2,
  RefreshCcw,
  Play,
  CheckCircle,
  Plus,
  Save,
  Cpu,
  Zap,
  ArrowLeft,
  Monitor,
  Hash,
  X,
  AlertTriangle,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Edit2,
  Check,
  Crown,
  Info,
  List, // 新增 List 圖示
} from 'lucide-react';

// --- Firebase Configuration & Initialization ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = import.meta.env.VITE_APP_ID || 'lottery-weare';

// --- Helper Components ---

const Card = ({ children, className = '', onClick }) => (
  <div
    onClick={onClick}
    className={`bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden ${className}`}>
    {children}
  </div>
);

const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  size = 'md',
}) => {
  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-8 py-4 text-xl tracking-widest',
    xl: 'px-12 py-6 text-2xl font-black tracking-[0.2em]',
  };

  const baseStyle = `rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${sizeStyles[size]}`;

  const variants = {
    primary:
      'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(8,145,178,0.4)] border border-cyan-400/20',
    secondary:
      'bg-slate-800 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-950/50 hover:border-cyan-400 hover:text-cyan-300',
    danger:
      'bg-red-950/30 text-red-400 border border-red-900/50 hover:bg-red-900/50 hover:text-red-300 hover:border-red-500/50',
    success:
      'bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]',
    ghost:
      'bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/50',
    gold: 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white hover:from-yellow-500 hover:to-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)] border border-yellow-400/30',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Confetti = ({ active }) => {
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {[...Array(70)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-5%`,
            backgroundColor: [
              '#06b6d4',
              '#3b82f6',
              '#8b5cf6',
              '#fbbf24',
              '#f472b6',
            ][Math.floor(Math.random() * 5)],
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 20 + 10}px`,
            boxShadow: '0 0 15px currentColor',
            animationDuration: `${Math.random() * 2 + 1.5}s`,
            animationDelay: `${Math.random() * 1}s`,
          }}
        />
      ))}
    </div>
  );
};

const ConfirmationDialog = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-w-sm w-full overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            {title}
          </h3>
          <p className="text-slate-300 leading-relaxed">{message}</p>
        </div>
        <div className="bg-slate-800/50 p-4 flex justify-end gap-3 border-t border-slate-700">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-slate-300 font-bold hover:bg-slate-700 rounded-lg transition-colors">
            取消
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white font-bold hover:bg-red-700 rounded-lg shadow-md transition-colors">
            確認執行
          </button>
        </div>
      </div>
    </div>
  );
};

const AlertDialog = ({ isOpen, title, message, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-w-sm w-full overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Info className="w-5 h-5 text-cyan-500" />
            {title}
          </h3>
          <p className="text-slate-300 leading-relaxed">{message}</p>
        </div>
        <div className="bg-slate-800/50 p-4 flex justify-end border-t border-slate-700">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-cyan-600 text-white font-bold hover:bg-cyan-700 rounded-lg shadow-md transition-colors">
            確定
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Application ---

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('display'); // display, admin, results
  const [config, setConfig] = useState({ title: '年末狂歡會' });
  const [prizes, setPrizes] = useState([]);
  const [tickets, setTickets] = useState([]);

  // States
  const [displayStage, setDisplayStage] = useState('standby');
  const [selectedPrizeId, setSelectedPrizeId] = useState(null);
  const [drawQuantity, setDrawQuantity] = useState(1);
  const [currentWinners, setCurrentWinners] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  // Modals
  const [confirmation, setConfirmation] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => { },
  });
  const [alertInfo, setAlertInfo] = useState({
    isOpen: false,
    title: '',
    message: '',
  });

  // --- Auth & Data Sync ---
  useEffect(() => {
    const initAuth = async () => {
      try {
        await signInAnonymously(auth);
      } catch (error) {
        console.error('Auth Error:', error);
      }
    };
    initAuth();
    return onAuthStateChanged(auth, setUser);
  }, []);

  useEffect(() => {
    if (!user) return;

    const configUnsub = onSnapshot(
      doc(db, 'artifacts', appId, 'public', 'data', 'config', 'main'),
      (docSnap) => {
        if (docSnap.exists()) setConfig(docSnap.data());
        else
          setDoc(
            doc(db, 'artifacts', appId, 'public', 'data', 'config', 'main'),
            { title: '年末狂歡會' },
          );
      },
    );

    const prizesUnsub = onSnapshot(
      collection(db, 'artifacts', appId, 'public', 'data', 'prizes'),
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        data.sort((a, b) => (a.order || 0) - (b.order || 0));
        setPrizes(data);
      },
    );

    const ticketsUnsub = onSnapshot(
      collection(db, 'artifacts', appId, 'public', 'data', 'tickets'),
      (snapshot) => {
        const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        data.sort((a, b) => {
          const numA = parseInt(a.number) || 0;
          const numB = parseInt(b.number) || 0;
          return numA - numB;
        });
        setTickets(data);
      },
    );

    return () => {
      configUnsub();
      prizesUnsub();
      ticketsUnsub();
    };
  }, [user]);

  // --- Logic ---

  const availableTickets = useMemo(
    () => tickets.filter((t) => !t.isWinner),
    [tickets],
  );

  const requestConfirmation = (title, message, action) => {
    setConfirmation({
      isOpen: true,
      title,
      message,
      onConfirm: async () => {
        await action();
        setConfirmation((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const showAlert = (title, message) => {
    setAlertInfo({ isOpen: true, title, message });
  };

  const handleUpdateConfig = async (newTitle) => {
    if (!user) return;
    await setDoc(
      doc(db, 'artifacts', appId, 'public', 'data', 'config', 'main'),
      { title: newTitle },
      { merge: true },
    );
  };

  const handleGenerateTickets = async (start, end) => {
    if (!user) return;
    const batch = writeBatch(db);
    const startNum = parseInt(start);
    const endNum = parseInt(end);
    const count = endNum - startNum + 1;

    if (count > 450) {
      showAlert('數量過多', '一次最多只能生成 450 張彩票，請分批操作！');
      return;
    }

    for (let i = startNum; i <= endNum; i++) {
      const ticketNum = i.toString().padStart(3, '0');
      if (!tickets.find((t) => t.number === ticketNum)) {
        const ref = doc(
          collection(db, 'artifacts', appId, 'public', 'data', 'tickets'),
        );
        batch.set(ref, {
          number: ticketNum,
          isWinner: false,
          createdAt: serverTimestamp(),
        });
      }
    }
    await batch.commit();
    showAlert('成功', `已生成 ${count} 張彩票！`);
  };

  const handleClearTickets = () => {
    requestConfirmation(
      '清空彩票',
      '確定要刪除所有彩票嗎？此動作無法復原！',
      async () => {
        const batch = writeBatch(db);
        tickets
          .slice(0, 499)
          .forEach((t) =>
            batch.delete(
              doc(db, 'artifacts', appId, 'public', 'data', 'tickets', t.id),
            ),
          );
        await batch.commit();
      },
    );
  };

  const handleResetLottery = () => {
    requestConfirmation(
      '重置系統',
      '這將清空所有獎項的得主名單，並將所有彩票恢復為未中獎狀態。確定要執行嗎？',
      async () => {
        const batch = writeBatch(db);
        prizes.forEach((p) => {
          const ref = doc(
            db,
            'artifacts',
            appId,
            'public',
            'data',
            'prizes',
            p.id,
          );
          batch.update(ref, { winners: [] });
        });
        const winningTickets = tickets.filter((t) => t.isWinner);
        winningTickets.forEach((t) => {
          const ref = doc(
            db,
            'artifacts',
            appId,
            'public',
            'data',
            'tickets',
            t.id,
          );
          batch.update(ref, { isWinner: false, wonPrizeId: null });
        });
        await batch.commit();
      },
    );
  };

  const handleAddPrize = async (name, quantity, isGrandPrize) => {
    if (!user) return;
    await addDoc(
      collection(db, 'artifacts', appId, 'public', 'data', 'prizes'),
      {
        name,
        quantity: parseInt(quantity),
        isGrandPrize: !!isGrandPrize,
        winners: [],
        order: Date.now(),
        createdAt: serverTimestamp(),
      },
    );
  };

  const handleUpdatePrize = async (
    id,
    newName,
    newQuantity,
    newIsGrandPrize,
  ) => {
    if (!user) return;
    if (!newName || newQuantity <= 0) return;
    await updateDoc(
      doc(db, 'artifacts', appId, 'public', 'data', 'prizes', id),
      {
        name: newName,
        quantity: parseInt(newQuantity),
        isGrandPrize: !!newIsGrandPrize,
      },
    );
  };

  const handleDeletePrize = (id) => {
    requestConfirmation(
      '刪除獎項',
      '確定要刪除此獎項嗎？已中獎的紀錄可能會受影響。',
      async () => {
        await deleteDoc(
          doc(db, 'artifacts', appId, 'public', 'data', 'prizes', id),
        );
      },
    );
  };

  const handleMovePrize = async (index, direction) => {
    if (index + direction < 0 || index + direction >= prizes.length) return;
    const currentPrize = prizes[index];
    const targetPrize = prizes[index + direction];
    const batch = writeBatch(db);
    const currentRef = doc(
      db,
      'artifacts',
      appId,
      'public',
      'data',
      'prizes',
      currentPrize.id,
    );
    const targetRef = doc(
      db,
      'artifacts',
      appId,
      'public',
      'data',
      'prizes',
      targetPrize.id,
    );
    batch.update(currentRef, { order: targetPrize.order || Date.now() });
    batch.update(targetRef, { order: currentPrize.order || Date.now() });
    await batch.commit();
  };

  const startSelecting = () => setDisplayStage('select-prize');

  const selectPrize = (prize) => {
    setSelectedPrizeId(prize.id);
    const remaining = prize.quantity - (prize.winners?.length || 0);
    if (remaining <= 0) {
      showAlert('無可用名額', '此獎項已抽完，無剩餘名額！');
      return;
    }
    setDrawQuantity(Math.max(1, remaining));
    setDisplayStage('config-qty');
  };

  const executeDraw = async () => {
    const prize = prizes.find((p) => p.id === selectedPrizeId);
    if (!prize) return;

    const remaining = prize.quantity - (prize.winners?.length || 0);
    if (remaining <= 0) {
      showAlert('無可用名額', '此獎項已抽完，無剩餘名額！');
      return;
    }
    if (drawQuantity > remaining) {
      showAlert(
        '數量超過限制',
        `此獎項剩餘名額僅有 ${remaining} 個，無法抽出 ${drawQuantity} 位得主。`,
      );
      return;
    }
    if (availableTickets.length === 0) {
      showAlert('票池為空', '目前沒有可用的彩票！請先至「後台管理」生成彩票。');
      return;
    }
    if (availableTickets.length < drawQuantity) {
      showAlert(
        '票數不足',
        `剩餘有效票數僅有 ${availableTickets.length} 張，無法抽出 ${drawQuantity} 位得主。`,
      );
      return;
    }
    if (drawQuantity <= 0) {
      showAlert('設定錯誤', '抽獎數量必須大於 0');
      return;
    }

    const shuffled = [...availableTickets].sort(() => 0.5 - Math.random());
    const winners = shuffled.slice(0, drawQuantity);
    const winnerNumbers = winners.map((w) => w.number);

    const batch = writeBatch(db);
    winners.forEach((w) => {
      const ref = doc(
        db,
        'artifacts',
        appId,
        'public',
        'data',
        'tickets',
        w.id,
      );
      batch.update(ref, { isWinner: true, wonPrizeId: selectedPrizeId });
    });
    const prizeRef = doc(
      db,
      'artifacts',
      appId,
      'public',
      'data',
      'prizes',
      selectedPrizeId,
    );
    const updatedWinners = [...(prize.winners || []), ...winnerNumbers];
    batch.update(prizeRef, { winners: updatedWinners });
    await batch.commit();

    console.log('開始動畫，抽獎數量:', drawQuantity, '中獎者:', winnerNumbers);
    setDisplayStage('drawing');
    setShowConfetti(false);

    // 初始化動畫狀態
    let animatingWinners = Array.from({ length: drawQuantity }, () => ({
      number: '000',
      locked: false,
    }));
    setCurrentWinners(animatingWinners);

    // 等待畫面切換完成後再開始動畫
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    await delay(100);

    const spinInterval = setInterval(() => {
      setCurrentWinners((prev) =>
        prev.map((item) => {
          if (item.locked) return item;
          return {
            number: Math.floor(Math.random() * 999)
              .toString()
              .padStart(3, '0'),
            locked: false,
          };
        }),
      );
    }, 50);

    await delay(1500);

    for (let i = 0; i < winners.length; i++) {
      setCurrentWinners((prev) => {
        const next = [...prev];
        next[i] = { number: winners[i].number, locked: true };
        return next;
      });
      const dropDelay = drawQuantity > 10 ? 200 : 800;
      if (i < winners.length - 1) await delay(dropDelay);
    }

    clearInterval(spinInterval);
    await delay(1000);

    // 將 winners 轉換為正確的格式
    const finalWinners = winners.map((w) => ({
      number: w.number,
      locked: true,
    }));
    setCurrentWinners(finalWinners);

    console.log('動畫完成，切換到結果頁面');
    setDisplayStage('result');
    setShowConfetti(true);
  };

  // --- Views ---

  const StandbyScreen = () => {
    const grandPrizes = prizes.filter((p) => p.isGrandPrize);
    const normalPrizes = prizes.filter((p) => !p.isGrandPrize);

    return (
      <div className="h-full w-full flex flex-col p-6 max-w-[95vw] mx-auto relative">
        <div className="text-center mb-6 flex-shrink-0 relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)] tracking-tighter mb-4">
            {config.title}
          </h1>
          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-2 text-cyan-400">
              <Ticket className="w-4 h-4" />
              <span className="text-sm font-bold tracking-widest text-slate-400">
                總票池
              </span>
              <span className="font-mono text-white">{tickets.length}</span>
            </div>
            <div className="w-px h-4 bg-slate-700 self-center"></div>
            <div className="flex items-center gap-2 text-emerald-400">
              <RefreshCcw className="w-4 h-4" />
              <span className="text-sm font-bold tracking-widest text-slate-400">
                待中獎
              </span>
              <span className="font-mono text-white">
                {availableTickets.length}
              </span>
            </div>
          </div>
        </div>

        <div
          onDoubleClick={() => setActiveTab('admin')}
          className="flex-1 overflow-y-auto pb-32 scrollbar-none mask-image-gradient px-2 space-y-6">
          {prizes.length === 0 && (
            <div className="text-center text-slate-600 mt-20 font-mono tracking-widest">
              NO PRIZES CONFIGURED
            </div>
          )}

          {grandPrizes.length > 0 && (
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center gap-3 text-yellow-500/80 mb-2">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-500/50"></div>
                <Crown className="w-5 h-5" />
                <span className="text-sm font-bold tracking-[0.2em] uppercase">
                  Grand Prize
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-500/50"></div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {grandPrizes.map((p) => {
                  const remaining = Math.max(
                    0,
                    p.quantity - (p.winners?.length || 0),
                  );
                  const isDone = remaining === 0;
                  return (
                    <div
                      key={p.id}
                      className={`group relative p-6 rounded-2xl border transition-all duration-500 ${isDone ? 'bg-slate-900/40 border-slate-800 opacity-50 grayscale' : 'bg-gradient-to-br from-slate-900/90 via-yellow-900/10 to-slate-900/90 border-yellow-500/50 shadow-[0_0_40px_rgba(234,179,8,0.15)] hover:shadow-[0_0_60px_rgba(234,179,8,0.25)] hover:scale-[1.02]'}`}>
                      {!isDone && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer pointer-events-none rounded-2xl"></div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div
                            className={`w-16 h-16 flex items-center justify-center rounded-2xl ${isDone ? 'bg-slate-800 text-slate-600' : 'bg-gradient-to-br from-yellow-400 to-amber-600 text-white shadow-lg shadow-amber-500/20'}`}>
                            <Trophy className="w-8 h-8" />
                          </div>
                          <div>
                            <h3
                              className={`text-4xl font-black tracking-wide ${isDone ? 'text-slate-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-400'}`}>
                              {p.name}
                            </h3>
                            <div className="text-sm text-yellow-500/60 font-mono mt-1 uppercase tracking-widest flex items-center gap-2">
                              <Crown className="w-3 h-3" /> Ultimate Reward
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-5xl font-mono font-black leading-none ${isDone ? 'text-slate-600' : 'text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]'}`}>
                            {remaining}
                          </div>
                          <div className="text-xs text-yellow-600/50 font-bold uppercase tracking-widest mt-1">
                            Remaining
                          </div>
                        </div>
                      </div>
                      {isDone && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="px-6 py-2 bg-slate-950/90 rounded-lg border border-slate-700 text-slate-400 text-xl font-bold tracking-widest transform -rotate-6 shadow-2xl">
                            CLAIMED
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {normalPrizes.map((p, index) => {
              const remaining = Math.max(
                0,
                p.quantity - (p.winners?.length || 0),
              );
              const isDone = remaining === 0;
              const originalIndex = prizes.findIndex(
                (orig) => orig.id === p.id,
              );
              return (
                <div
                  key={p.id}
                  className={`group relative p-3 rounded-xl border backdrop-blur-sm transition-all duration-300 ${isDone ? 'bg-slate-900/40 border-slate-800 opacity-50 grayscale' : 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:scale-[1.02]'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg font-mono text-xs font-bold ${isDone ? 'bg-slate-800 text-slate-600' : 'bg-cyan-950 text-cyan-400 border border-cyan-500/30'}`}>
                      {originalIndex + 1}
                    </span>
                    <h3
                      className={`text-base font-bold tracking-wide leading-tight line-clamp-1 ${isDone ? 'text-slate-500' : 'text-white'}`}>
                      {p.name}
                    </h3>
                  </div>
                  <div className="flex items-end justify-between border-t border-slate-700/50 pt-1.5">
                    <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                      Total: {p.quantity}
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-xl font-mono font-black leading-none ${isDone ? 'text-slate-600' : 'text-emerald-400'}`}>
                        {remaining}
                      </div>
                      <div className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">
                        Left
                      </div>
                    </div>
                  </div>
                  {isDone && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="px-2 py-0.5 bg-slate-950/80 rounded border border-slate-700 text-slate-400 text-[10px] font-bold tracking-widest transform -rotate-6 shadow-xl">
                        DONE
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-20 flex justify-center pointer-events-none">
          <div className="pointer-events-auto shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-full">
            <Button
              onClick={startSelecting}
              size="xl"
              variant="primary"
              className="animate-bounce-slow shadow-[0_0_40px_rgba(8,145,178,0.5)] border-2 border-cyan-400/30 hover:scale-105 active:scale-95">
              <Play fill="currentColor" className="w-8 h-8 mr-4" /> 啟動中獎系統
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // ... (PrizeSelectionScreen, ConfigQtyScreen, DrawingScreen remain same as previous, omitted for brevity but included in final full file if needed) ...
  // Re-adding them here for completeness since user asked for "another page" update but I need to provide full file.

  const PrizeSelectionScreen = () => (
    <div className="h-full flex flex-col p-8">
      <div className="flex items-center justify-between mb-8 flex-shrink-0">
        <Button variant="ghost" onClick={() => setDisplayStage('standby')}>
          <ArrowLeft className="w-6 h-6 mr-2" /> 回首頁
        </Button>
        <h2 className="text-3xl font-bold text-cyan-400 tracking-widest">
          請選擇本次抽獎項目
        </h2>
        <div className="w-24"></div>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto content-start pb-20">
        {prizes.map((p) => {
          const remaining = Math.max(0, p.quantity - (p.winners?.length || 0));
          const isDone = remaining === 0;
          const isGrand = p.isGrandPrize;
          return (
            <button
              key={p.id}
              onClick={() => !isDone && selectPrize(p)}
              disabled={isDone}
              className={`relative group text-left p-8 rounded-2xl border-2 transition-all duration-300 ${isDone ? 'bg-slate-900/50 border-slate-800 grayscale cursor-not-allowed opacity-50' : isGrand ? 'bg-gradient-to-br from-slate-900 via-yellow-900/10 to-slate-900 border-yellow-500/50 hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]' : 'bg-slate-800/80 border-slate-700 hover:border-cyan-500 hover:bg-slate-800 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]'} hover:-translate-y-1`}>
              {isDone && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <span className="bg-slate-900 text-slate-500 px-4 py-2 rounded-full border border-slate-700 font-bold tracking-widest transform -rotate-12">
                    COMPLETED
                  </span>
                </div>
              )}
              <div className="flex justify-between items-start mb-4">
                {isGrand ? (
                  <Crown
                    className={`w-10 h-10 ${isDone ? 'text-slate-600' : 'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]'}`}
                  />
                ) : (
                  <Trophy
                    className={`w-10 h-10 ${isDone ? 'text-slate-600' : 'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]'}`}
                  />
                )}
                <div className="text-right">
                  <div className="text-sm text-slate-400">剩餘名額</div>
                  <div
                    className={`text-4xl font-mono font-black ${isDone ? 'text-slate-600' : isGrand ? 'text-yellow-400' : 'text-emerald-400'}`}>
                    {remaining}
                  </div>
                </div>
              </div>
              <h3
                className={`text-2xl font-bold ${isDone ? 'text-slate-600' : isGrand ? 'text-yellow-100' : 'text-white'}`}>
                {p.name}
              </h3>
              <div className="mt-2 text-slate-500 text-sm font-mono">
                TOTAL QTY: {p.quantity}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const ConfigQtyScreen = () => {
    const prize = prizes.find((p) => p.id === selectedPrizeId);
    if (!prize) return null;
    const actualRemaining = prize.quantity - (prize.winners?.length || 0);
    const remaining = Math.max(0, actualRemaining);

    // 如果實際剩餘 <=0，返回錯誤提示
    if (actualRemaining <= 0) {
      return (
        <div className="h-full flex flex-col items-center justify-center p-8">
          <div className="bg-red-900/20 border border-red-500/50 p-8 rounded-2xl max-w-md text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-400 mb-2">無可用名額</h2>
            <p className="text-slate-300 mb-6">
              此獎項已無剩餘名額，無法進行抽獎。
            </p>
            <Button
              onClick={() => setDisplayStage('select-prize')}
              variant="secondary">
              重新選擇獎項
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col items-center justify-center p-8 relative">
        <Button
          variant="ghost"
          onClick={() => setDisplayStage('select-prize')}
          className="absolute top-8 left-8">
          <ArrowLeft className="w-6 h-6 mr-2" /> 重新選擇獎項
        </Button>
        <div className="bg-slate-900/90 border border-slate-700 p-12 rounded-3xl shadow-2xl max-w-3xl w-full text-center relative overflow-hidden">
          <div
            className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${prize.isGrandPrize ? 'from-yellow-500 via-amber-500 to-yellow-600' : 'from-cyan-500 to-purple-500'}`}></div>
          <h2 className="text-slate-400 font-bold tracking-widest mb-2 uppercase">
            Current Prize
          </h2>
          <h1
            className={`text-5xl font-black mb-8 ${prize.isGrandPrize ? 'text-yellow-400' : 'text-white'}`}>
            {prize.name}
          </h1>
          <div className="flex items-center justify-center gap-12 mb-10">
            <div className="text-center">
              <div className="text-sm text-slate-500 mb-1">剩餘名額</div>
              <div
                className={`text-4xl font-mono font-bold ${prize.isGrandPrize ? 'text-yellow-400' : 'text-emerald-400'}`}>
                {remaining}
              </div>
            </div>
            <div className="w-px h-16 bg-slate-700"></div>
            <div className="text-center">
              <div className="text-sm text-slate-500 mb-1">票池剩餘</div>
              <div
                className={`text-4xl font-mono font-bold ${availableTickets.length < drawQuantity ? 'text-red-500' : 'text-cyan-400'}`}>
                {availableTickets.length}
              </div>
            </div>
            <div className="w-px h-16 bg-slate-700"></div>
            <div className="text-center">
              <div className="text-sm text-slate-500 mb-1">本次抽出</div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setDrawQuantity(Math.max(1, drawQuantity - 1))}
                  disabled={drawQuantity <= 1}
                  className="w-10 h-10 rounded-full bg-slate-800 text-white hover:bg-slate-700 flex items-center justify-center text-xl font-bold disabled:opacity-30 disabled:cursor-not-allowed">
                  -
                </button>
                <input
                  type="number"
                  value={drawQuantity}
                  min="1"
                  max={remaining}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setDrawQuantity(Math.max(1, Math.min(val, remaining)));
                  }}
                  className="w-32 bg-slate-950 border-2 border-cyan-500/50 rounded-lg text-4xl text-center py-2 text-white font-mono focus:outline-none focus:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                />
                <button
                  onClick={() =>
                    setDrawQuantity(Math.min(remaining, drawQuantity + 1))
                  }
                  disabled={drawQuantity >= remaining}
                  className="w-10 h-10 rounded-full bg-slate-800 text-white hover:bg-slate-700 flex items-center justify-center text-xl font-bold disabled:opacity-30 disabled:cursor-not-allowed">
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-10">
            {[1, 3, 5, 10].map((num) => (
              <button
                key={num}
                onClick={() => setDrawQuantity(Math.min(num, remaining))}
                disabled={num > remaining}
                className="bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed py-3 rounded-lg font-bold text-cyan-300 border border-slate-700">
                抽 {num} 個
              </button>
            ))}
          </div>
          {remaining === 0 && (
            <div className="mb-4 p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400 text-center">
              <AlertTriangle className="w-5 h-5 inline mr-2" />
              此獎項已無剩餘名額，無法進行抽獎
            </div>
          )}
          {drawQuantity > remaining && remaining > 0 && (
            <div className="mb-4 p-4 bg-yellow-900/20 border border-yellow-500/50 rounded-xl text-yellow-400 text-center">
              <AlertTriangle className="w-5 h-5 inline mr-2" />
              抽獎數量超過剩餘名額，請調整數量
            </div>
          )}
          <div className="flex gap-4">
            <button
              onClick={() => setDrawQuantity(remaining)}
              disabled={remaining === 0}
              className="flex-1 bg-purple-900/50 hover:bg-purple-800/80 border border-purple-500/50 text-purple-300 py-4 rounded-xl font-bold tracking-widest text-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              ALL IN (梭哈 {remaining})
            </button>
            <Button
              onClick={executeDraw}
              disabled={
                remaining === 0 ||
                drawQuantity === 0 ||
                drawQuantity > remaining ||
                availableTickets.length < drawQuantity
              }
              size="lg"
              className="flex-[2] bg-gradient-to-r from-cyan-600 to-blue-600 hover:scale-105 transform transition-transform shadow-[0_0_40px_rgba(8,145,178,0.5)]">
              <Play fill="currentColor" className="w-6 h-6 mr-2" /> 開始抽獎
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const DrawingScreen = () => (
    <div className="h-full flex flex-col items-center justify-center relative bg-slate-950">
      <div className="absolute inset-0 bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950"></div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>
      </div>
      <div className="relative z-10 flex-shrink-0 pt-10 pb-6">
        <h2 className="text-4xl text-cyan-500 font-black tracking-[1em] animate-pulse">
          DRAWING...
        </h2>
      </div>
      <div className="relative z-10 flex-1 w-full overflow-y-auto px-4 pb-20 scrollbar-none">
        <div className="flex flex-wrap justify-center gap-6">
          {currentWinners.map((w, i) => (
            <div
              key={i}
              className={`
                            w-64 h-64 bg-slate-900/80 border-2 border-cyan-400/50 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.3)] backdrop-blur-xl
                            ${w.locked ? 'animate-drop-in border-yellow-400/80 shadow-[0_0_50px_rgba(234,179,8,0.5)] bg-slate-800' : 'animate-bounce'}
                        `}
              style={
                w.locked
                  ? {}
                  : {
                    animationDuration: '0.5s',
                    animationDelay: `${i * 0.05}s`,
                  }
              }>
              <span
                className={`text-8xl font-black font-mono tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] ${w.locked ? 'text-yellow-400' : 'text-cyan-50'}`}>
                {w.number}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ResultScreen = () => {
    const prize = prizes.find((p) => p.id === selectedPrizeId);
    return (
      <div className="h-full flex flex-col relative bg-slate-900/90 z-10">
        <Confetti active={true} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-slate-900 pointer-events-none"></div>

        <div className="flex-1 overflow-y-auto scrollbar-none p-8">
          <div className="flex flex-col items-center min-h-full">
            <div
              className={`mb-8 inline-block px-8 py-3 rounded-full border-2 font-black tracking-widest text-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] animate-in zoom-in duration-300 ${prize?.isGrandPrize ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' : 'bg-cyan-500/20 border-cyan-500 text-cyan-400'}`}>
              {prize?.name} 得主
            </div>

            <div className="flex flex-wrap justify-center gap-6 w-full max-w-[90vw] animate-in slide-in-from-bottom-10 duration-500 delay-100 pb-32">
              {currentWinners.map((w, i) => (
                <div key={i} className="group relative">
                  <div
                    className={`absolute -inset-2 bg-gradient-to-r rounded-3xl blur opacity-40 group-hover:opacity-100 transition duration-500 animate-tilt ${prize?.isGrandPrize ? 'from-yellow-400 to-amber-600' : 'from-cyan-400 to-blue-600'}`}></div>
                  <div
                    className={`relative w-72 h-72 bg-slate-900 ring-2 rounded-2xl flex flex-col items-center justify-center shadow-2xl ${prize?.isGrandPrize ? 'ring-yellow-500/50' : 'ring-cyan-500/50'}`}>
                    {prize?.isGrandPrize ? (
                      <Crown className="w-12 h-12 text-yellow-500 mb-4 opacity-50" />
                    ) : (
                      <Trophy className="w-12 h-12 text-cyan-500 mb-4 opacity-50" />
                    )}
                    <div className="text-8xl font-black text-white font-mono tracking-tighter drop-shadow-xl">
                      {w.number}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 p-6 z-30 bg-gradient-to-t from-slate-950 via-slate-900/95 to-transparent flex justify-center gap-6 backdrop-blur-sm border-t border-slate-800/30">
          <Button
            onClick={() => setDisplayStage('standby')}
            variant="secondary"
            size="lg"
            className="shadow-lg hover:shadow-cyan-500/20">
            <Monitor className="w-5 h-5 mr-2" /> 回大螢幕首頁
          </Button>
          <Button
            onClick={() => setDisplayStage('select-prize')}
            variant="primary"
            size="lg"
            className="shadow-lg hover:shadow-blue-500/20">
            <ArrowLeft className="w-5 h-5 mr-2" /> 繼續抽其他獎項
          </Button>
        </div>
      </div>
    );
  };

  const ResultsView = () => {
    const grandPrizes = prizes.filter((p) => p.isGrandPrize);
    const normalPrizes = prizes.filter((p) => !p.isGrandPrize);

    const PrizeResultCard = ({ prize }) => (
      <div
        className={`p-4 rounded-xl border mb-4 ${prize.isGrandPrize ? 'bg-yellow-900/10 border-yellow-500/30' : 'bg-slate-950/50 border-slate-800/50'}`}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            {prize.isGrandPrize ? (
              <Crown className="w-6 h-6 text-yellow-500" />
            ) : (
              <Trophy className="w-5 h-5 text-cyan-500" />
            )}
            <h3
              className={`text-xl font-bold ${prize.isGrandPrize ? 'text-yellow-400' : 'text-white'}`}>
              {prize.name}
            </h3>
          </div>
          <span className="text-sm text-slate-500">
            {prize.winners?.length || 0} / {prize.quantity}
          </span>
        </div>
        {prize.winners && prize.winners.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {prize.winners.map((winner, idx) => (
              <span
                key={idx}
                className={`px-3 py-1 rounded font-mono font-bold text-lg ${prize.isGrandPrize ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' : 'bg-slate-800 text-cyan-300 border border-slate-700'}`}>
                {winner}
              </span>
            ))}
          </div>
        ) : (
          <div className="text-slate-600 text-sm italic">尚未開獎</div>
        )}
      </div>
    );

    return (
      <div className="max-w-6xl mx-auto space-y-8 pb-20 pt-10 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">開獎結果一覽</h1>
          <Button variant="ghost" onClick={() => setActiveTab('display')}>
            <Monitor className="w-5 h-5 mr-2" /> 返回抽獎現場
          </Button>
        </div>

        {grandPrizes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-yellow-500 mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5" /> 年度大獎
            </h2>
            {grandPrizes.map((p) => (
              <PrizeResultCard key={p.id} prize={p} />
            ))}
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold text-cyan-500 mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5" /> 常規獎項
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {normalPrizes.map((p) => (
              <PrizeResultCard key={p.id} prize={p} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const AdminView = () => {
    // ... (AdminView implementation remains the same, omitted for brevity but present in final code)
    const [ticketStart, setTicketStart] = useState('1');
    const [ticketEnd, setTicketEnd] = useState('100');
    const [prizeName, setPrizeName] = useState('');
    const [prizeQty, setPrizeQty] = useState('1');
    const [isGrandPrize, setIsGrandPrize] = useState(false);
    const [titleInput, setTitleInput] = useState(config.title);

    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
      name: '',
      quantity: '',
      isGrandPrize: false,
    });

    const handleStartEdit = (prize) => {
      setEditingId(prize.id);
      setEditForm({
        name: prize.name,
        quantity: prize.quantity,
        isGrandPrize: prize.isGrandPrize || false,
      });
    };

    const handleCancelEdit = () => {
      setEditingId(null);
      setEditForm({ name: '', quantity: '', isGrandPrize: false });
    };

    const handleSaveEdit = async () => {
      if (!editForm.name || editForm.quantity <= 0)
        return showAlert('錯誤', '請輸入有效的名稱與數量');
      try {
        await handleUpdatePrize(
          editingId,
          editForm.name,
          editForm.quantity,
          editForm.isGrandPrize,
        );
        setEditingId(null);
      } catch (e) {
        console.error(e);
        showAlert('失敗', '更新失敗');
      }
    };

    return (
      <div className="max-w-4xl mx-auto space-y-8 pb-20 pt-10 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">後台控制台</h1>
          <Button variant="ghost" onClick={() => setActiveTab('display')}>
            <Monitor className="w-5 h-5 mr-2" /> 返回抽獎現場
          </Button>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-cyan-400">
            <Settings className="w-5 h-5" /> 系統設定
          </h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700 text-white p-2 rounded focus:ring-2 focus:ring-cyan-500 outline-none placeholder-slate-600"
              placeholder="輸入活動名稱"
            />
            <Button onClick={() => handleUpdateConfig(titleInput)}>
              <Save className="w-4 h-4" /> 更新標題
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-cyan-400">
            <Ticket className="w-5 h-5" /> 彩票管理
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-400">批量產生彩票</h3>
              <div className="flex items-center gap-2 text-white">
                <input
                  type="number"
                  value={ticketStart}
                  onChange={(e) => setTicketStart(e.target.value)}
                  className="w-24 bg-slate-950 border border-slate-700 p-2 rounded focus:border-cyan-500 outline-none"
                  placeholder="Start"
                />
                <span className="text-slate-500">to</span>
                <input
                  type="number"
                  value={ticketEnd}
                  onChange={(e) => setTicketEnd(e.target.value)}
                  className="w-24 bg-slate-950 border border-slate-700 p-2 rounded focus:border-cyan-500 outline-none"
                  placeholder="End"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleGenerateTickets(ticketStart, ticketEnd)}>
                  <Plus className="w-4 h-4" /> 生成
                </Button>
                <Button variant="danger" onClick={handleClearTickets}>
                  <Trash2 className="w-4 h-4" /> 清空
                </Button>
              </div>
            </div>
            <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
              <div className="text-sm text-slate-500 mb-2">彩票池概況</div>
              <div className="text-3xl font-bold text-white font-mono">
                {tickets.length}{' '}
                <span className="text-sm text-slate-600 font-sans">TOTAL</span>
              </div>
              <div className="text-sm text-cyan-500 font-medium mt-1">
                有效票：{availableTickets.length} 張
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-cyan-400">
            <Trophy className="w-5 h-5" /> 獎項設定
          </h2>
          <div className="flex flex-wrap gap-2 mb-6 items-center">
            <input
              type="text"
              placeholder="獎項名稱 (如：特等獎)"
              className="flex-1 bg-slate-950 border border-slate-700 text-white p-2 rounded focus:border-cyan-500 outline-none placeholder-slate-600"
              value={prizeName}
              onChange={(e) => setPrizeName(e.target.value)}
            />
            <input
              type="number"
              placeholder="數量"
              className="w-24 bg-slate-950 border border-slate-700 text-white p-2 rounded focus:border-cyan-500 outline-none placeholder-slate-600"
              value={prizeQty}
              onChange={(e) => setPrizeQty(e.target.value)}
            />

            <label className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-3 py-2 rounded cursor-pointer select-none hover:bg-slate-800">
              <input
                type="checkbox"
                checked={isGrandPrize}
                onChange={(e) => setIsGrandPrize(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-600 focus:ring-0"
              />
              <span className="text-sm text-slate-300">👑 設為最大獎</span>
            </label>

            <Button
              onClick={() => {
                handleAddPrize(prizeName, prizeQty, isGrandPrize);
                setPrizeName('');
                setIsGrandPrize(false);
              }}>
              <Plus className="w-4 h-4" /> 新增
            </Button>
          </div>
          <div className="space-y-2">
            {prizes.map((prize, index) => (
              <div
                key={prize.id}
                className={`flex items-center justify-between p-3 rounded border transition-colors ${prize.isGrandPrize ? 'bg-yellow-900/10 border-yellow-500/30' : 'bg-slate-950/50 border-slate-800/50 hover:border-cyan-500/30'}`}>
                <div className="flex items-center gap-3 flex-1">
                  <span
                    className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-mono border ${prize.isGrandPrize ? 'bg-yellow-900 text-yellow-400 border-yellow-700' : 'bg-slate-800 text-cyan-400 border-slate-700'}`}>
                    {index + 1}
                  </span>
                  {editingId === prize.id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className="flex-1 bg-slate-900 border border-slate-600 text-white px-2 py-1 rounded"
                      />
                      <input
                        type="number"
                        value={editForm.quantity}
                        onChange={(e) =>
                          setEditForm({ ...editForm, quantity: e.target.value })
                        }
                        className="w-20 bg-slate-900 border border-slate-600 text-white px-2 py-1 rounded"
                      />
                      <label className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={editForm.isGrandPrize}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              isGrandPrize: e.target.checked,
                            })
                          }
                        />
                        <span className="text-xs text-slate-300">最大獎</span>
                      </label>
                    </div>
                  ) : (
                    <div>
                      <span
                        className={`font-bold text-lg mr-2 flex items-center gap-2 ${prize.isGrandPrize ? 'text-yellow-400' : 'text-slate-200'}`}>
                        {prize.name}
                        {prize.isGrandPrize && (
                          <Crown className="w-4 h-4 text-yellow-500" />
                        )}
                      </span>
                      <span className="text-sm text-slate-500">
                        x {prize.quantity}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  {editingId === prize.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="text-emerald-400 hover:text-emerald-300">
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-slate-400 hover:text-slate-300">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleMovePrize(index, -1)}
                          disabled={index === 0}
                          className="p-1 rounded hover:bg-slate-700 text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent"
                          title="上移">
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleMovePrize(index, 1)}
                          disabled={index === prizes.length - 1}
                          className="p-1 rounded hover:bg-slate-700 text-slate-400 disabled:opacity-30 disabled:hover:bg-transparent"
                          title="下移">
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-sm text-slate-500 font-mono">
                        DRAWN: {prize.winners?.length || 0}
                      </span>
                      <button
                        onClick={() => handleStartEdit(prize)}
                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                        title="編輯">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePrize(prize.id)}
                        className="text-slate-600 hover:text-red-500 transition-colors"
                        title="刪除">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-red-900/50">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-5 h-5" /> 系統維護
          </h2>
          <div className="flex items-center justify-between">
            <div className="text-slate-400 text-sm">
              注意：此操作將清空所有獎項的得主名單，並將彩票恢復為未中獎狀態。
            </div>
            <Button variant="danger" onClick={handleResetLottery}>
              <RotateCcw className="w-4 h-4" /> 重置所有中獎結果
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  const DisplayView = () => {
    return (
      <div className="fixed inset-0 bg-slate-950 text-white overflow-hidden">
        {/* Background Ambient Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_#1e293b_0%,_#020617_100%)]"></div>
          <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-cyan-900/10 to-transparent"></div>
        </div>
        <div className="relative z-10 w-full h-full">
          {displayStage === 'standby' && <StandbyScreen />}
          {displayStage === 'select-prize' && <PrizeSelectionScreen />}
          {displayStage === 'config-qty' && <ConfigQtyScreen />}
          {displayStage === 'drawing' && <DrawingScreen />}
          {displayStage === 'result' && <ResultScreen />}
        </div>
      </div>
    );
  };

  if (!user)
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950 text-cyan-500 font-mono animate-pulse">
        INITIALIZING SYSTEM...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <style>{`
        @keyframes confetti {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
            animation-name: confetti;
            animation-timing-function: ease-out;
            animation-fill-mode: forwards;
        }
        .animate-tilt {
            animation: tilt 10s infinite linear;
        }
        @keyframes tilt {
            0%, 50%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(0.5deg); }
            75% { transform: rotate(-0.5deg); }
        }
        @keyframes bounce-slow {
             0%, 100% { transform: translateY(-5%); }
             50% { transform: translateY(5%); }
        }
        .animate-bounce-slow {
             animation: bounce-slow 2s infinite ease-in-out;
        }
        @keyframes shimmer {
            from { transform: translateX(-100%) skewX(-12deg); }
            to { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shimmer {
            animation: shimmer 2.5s infinite linear;
        }
        @keyframes drop-in {
            0% { transform: translateY(-100%); opacity: 0; }
            60% { transform: translateY(10%); opacity: 1; }
            100% { transform: translateY(0); }
        }
        .animate-drop-in {
            animation: drop-in 0.5s ease-out forwards;
        }
      `}</style>

      {/* Admin Toggle */}
      <nav className="fixed top-0 right-0 z-50 p-4 opacity-0 hover:opacity-100 transition-opacity">
        <div className="bg-slate-900/90 border border-slate-700 rounded-lg p-2 flex gap-2">
          <button
            onClick={() => setActiveTab('display')}
            className={`px-3 py-1 text-xs font-bold rounded ${activeTab === 'display' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}>
            螢幕
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-3 py-1 text-xs font-bold rounded ${activeTab === 'results' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}>
            結果
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-3 py-1 text-xs font-bold rounded ${activeTab === 'admin' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}>
            後台
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="h-full w-full">
        {activeTab === 'display' ? (
          <DisplayView />
        ) : activeTab === 'results' ? (
          <ResultsView />
        ) : (
          <AdminView />
        )}
      </main>

      {/* Confirmation Modal */}
      <ConfirmationDialog
        isOpen={confirmation.isOpen}
        title={confirmation.title}
        message={confirmation.message}
        onConfirm={confirmation.onConfirm}
        onCancel={() => setConfirmation((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Alert Modal */}
      <AlertDialog
        isOpen={alertInfo.isOpen}
        title={alertInfo.title}
        message={alertInfo.message}
        onClose={() => setAlertInfo((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
