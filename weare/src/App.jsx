import React, { useState, useEffect, useMemo } from 'react';
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
  query,
  orderBy,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import {
  Trophy,
  Ticket,
  Trash2,
  Plus,
  Save,
  Zap,
  ArrowLeft,
  Hash,
  X,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Info,
  Settings,
} from 'lucide-react';

// Firebase Configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDx2Rz0qV7X5Q8P9N6M0L1K2J3H4G5F6',
  authDomain: 'lottery-app-b08b0.firebaseapp.com',
  projectId: 'lottery-app-b08b0',
  storageBucket: 'lottery-app-b08b0.appspot.com',
  messagingSenderId: '123456789012',
  appId: '1:123456789012:web:abcdef1234567890',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const APP_ID = 'lottery-weare';

// Utility Functions
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Dialog Components
const Alert = ({ title, message, onClose }) => (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-slate-900 border border-cyan-500/50 rounded-lg p-6 max-w-md shadow-[0_0_30px_rgba(6,182,212,0.3)]">
      <h2 className="text-lg font-bold text-cyan-400 mb-3">{title}</h2>
      <p className="text-slate-300 mb-6">{message}</p>
      <button
        onClick={onClose}
        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 rounded transition"
      >
        確定
      </button>
    </div>
  </div>
);

const Confirm = ({ title, message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-slate-900 border border-cyan-500/50 rounded-lg p-6 max-w-md shadow-[0_0_30px_rgba(6,182,212,0.3)]">
      <h2 className="text-lg font-bold text-cyan-400 mb-3">{title}</h2>
      <p className="text-slate-300 mb-6">{message}</p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 rounded transition"
        >
          取消
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 rounded transition"
        >
          確定
        </button>
      </div>
    </div>
  </div>
);

const Confetti = () => {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random(),
  }));

  return (
    <div className="fixed inset-0 pointer-events-none">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full animate-confetti"
          style={{
            left: `${piece.left}%`,
            top: '-10px',
            animation: `confetti ${piece.duration}s ease-out ${piece.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
};

// Main App Component
export default function App() {
  // State
  const [user, setUser] = useState(null);
  const [displayStage, setDisplayStage] = useState('standby');
  const [activeTab, setActiveTab] = useState('display');
  const [config, setConfig] = useState({ title: '抽獎系統' });
  const [prizes, setPrizes] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [selectedPrizeId, setSelectedPrizeId] = useState(null);
  const [drawQuantity, setDrawQuantity] = useState(1);
  const [currentWinners, setCurrentWinners] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [alert, setAlert] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // New Prize Form
  const [newPrize, setNewPrize] = useState({ name: '', quantity: 1, isGrandPrize: false });
  const [ticketsPerNumber, setTicketsPerNumber] = useState(10);
  const [maxTicketNumber, setMaxTicketNumber] = useState(100);

  // Initialize Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        await signInAnonymously(auth);
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  // Load Data from Firestore
  useEffect(() => {
    if (!user) return;

    // Load Config
    const unsubConfig = onSnapshot(
      doc(db, 'artifacts', APP_ID, 'public', 'data', 'config', 'main'),
      (snap) => {
        if (snap.exists()) setConfig(snap.data());
      },
    );

    // Load Prizes
    const unsubPrizes = onSnapshot(
      query(
        collection(db, 'artifacts', APP_ID, 'public', 'data', 'prizes'),
        orderBy('order', 'asc'),
      ),
      (snap) => {
        const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPrizes(list);
      },
    );

    // Load Tickets
    const unsubTickets = onSnapshot(
      collection(db, 'artifacts', APP_ID, 'public', 'data', 'tickets'),
      (snap) => {
        const list = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTickets(list);
      },
    );

    return () => {
      unsubConfig();
      unsubPrizes();
      unsubTickets();
    };
  }, [user]);

  // Derived State
  const availableTickets = useMemo(
    () => tickets.filter((t) => !t.isWinner),
    [tickets],
  );

  const showAlert = (title, message) => {
    setAlert({ title, message });
  };

  const showConfirm = (title, message, onConfirm) => {
    setConfirm({ title, message, onConfirm });
  };

  // CRUD Operations
  const addPrize = async () => {
    if (!newPrize.name.trim()) {
      showAlert('錯誤', '獎項名稱不能為空');
      return;
    }
    if (newPrize.quantity < 1) {
      showAlert('錯誤', '數量必須大於 0');
      return;
    }

    const order = prizes.length > 0 ? Math.max(...prizes.map((p) => p.order || 0)) + 1 : 1;

    try {
      await setDoc(doc(db, 'artifacts', APP_ID, 'public', 'data', 'prizes', newPrize.name), {
        name: newPrize.name,
        quantity: newPrize.quantity,
        isGrandPrize: newPrize.isGrandPrize,
        winners: [],
        order,
        createdAt: serverTimestamp(),
      });
      setNewPrize({ name: '', quantity: 1, isGrandPrize: false });
      showAlert('成功', '獎項已新增');
    } catch (error) {
      showAlert('錯誤', error.message);
    }
  };

  const updatePrize = async (prizeId, updates) => {
    try {
      const prizeRef = doc(db, 'artifacts', APP_ID, 'public', 'data', 'prizes', prizeId);
      await updateDoc(prizeRef, updates);
      showAlert('成功', '獎項已更新');
    } catch (error) {
      showAlert('錯誤', error.message);
    }
  };

  const deletePrize = async (prizeId) => {
    try {
      await deleteDoc(doc(db, 'artifacts', APP_ID, 'public', 'data', 'prizes', prizeId));
      showAlert('成功', '獎項已刪除');
    } catch (error) {
      showAlert('錯誤', error.message);
    }
  };

  const generateTickets = async () => {
    if (maxTicketNumber < 1 || ticketsPerNumber < 1) {
      showAlert('錯誤', '設定錯誤');
      return;
    }

    showConfirm(
      '產生彩票',
      `將產生 1 到 ${maxTicketNumber} 的彩票，每個號碼 ${ticketsPerNumber} 張，總計 ${
        maxTicketNumber * ticketsPerNumber
      } 張。確認？`,
      async () => {
        try {
          const batch = writeBatch(db);
          let count = 0;

          for (let num = 1; num <= maxTicketNumber; num++) {
            for (let copy = 0; copy < ticketsPerNumber; copy++) {
              const ticketId = `${num}-${copy}`;
              batch.set(doc(db, 'artifacts', APP_ID, 'public', 'data', 'tickets', ticketId), {
                number: String(num).padStart(3, '0'),
                isWinner: false,
                wonPrizeId: null,
                createdAt: serverTimestamp(),
              });
              count++;
            }
          }

          await batch.commit();
          showAlert('成功', `已產生 ${count} 張彩票`);
          setConfirm(null);
        } catch (error) {
          showAlert('錯誤', error.message);
        }
      },
    );
  };

  const clearAllTickets = async () => {
    showConfirm(
      '清空彩票',
      '此操作將刪除所有彩票。確認？',
      async () => {
        try {
          const batch = writeBatch(db);
          tickets.forEach((ticket) => {
            batch.delete(
              doc(db, 'artifacts', APP_ID, 'public', 'data', 'tickets', ticket.id),
            );
          });
          await batch.commit();
          showAlert('成功', '所有彩票已刪除');
          setConfirm(null);
        } catch (error) {
          showAlert('錯誤', error.message);
        }
      },
    );
  };

  const clearAllResults = async () => {
    showConfirm(
      '重置所有結果',
      '此操作將清除所有中獎記錄。確認？',
      async () => {
        try {
          const batch = writeBatch(db);

          // Reset all tickets
          tickets.forEach((ticket) => {
            batch.update(doc(db, 'artifacts', APP_ID, 'public', 'data', 'tickets', ticket.id), {
              isWinner: false,
              wonPrizeId: null,
            });
          });

          // Reset all prizes
          prizes.forEach((prize) => {
            batch.update(
              doc(db, 'artifacts', APP_ID, 'public', 'data', 'prizes', prize.id),
              {
                winners: [],
              },
            );
          });

          await batch.commit();
          showAlert('成功', '所有結果已重置');
          setConfirm(null);
        } catch (error) {
          showAlert('錯誤', error.message);
        }
      },
    );
  };

  const selectPrize = (prize) => {
    // Strict validation: remaining must be greater than 0
    const remaining = prize.quantity - (prize.winners?.length || 0);
    if (remaining <= 0) {
      showAlert('無可用名額', '此獎項已抽完，無剩餘名額！');
      return;
    }
    if (availableTickets.length === 0) {
      showAlert('票池為空', '目前沒有可用的彩票！');
      return;
    }

    setSelectedPrizeId(prize.id);
    setDrawQuantity(Math.min(1, remaining));
    setDisplayStage('config-qty');
  };

  const executeDraw = async () => {
    if (isDrawing) return;

    const prize = prizes.find((p) => p.id === selectedPrizeId);
    if (!prize) return;

    // Multi-layer validation
    const remaining = Math.max(0, prize.quantity - (prize.winners?.length || 0));

    if (remaining <= 0) {
      showAlert('無可用名額', '此獎項已抽完！');
      return;
    }

    if (drawQuantity <= 0) {
      showAlert('設定錯誤', '抽獎數量必須大於 0');
      return;
    }

    if (drawQuantity > remaining) {
      showAlert(
        '數量超過限制',
        `剩餘名額僅有 ${remaining} 個，無法抽出 ${drawQuantity} 位。`,
      );
      return;
    }

    if (availableTickets.length < drawQuantity) {
      showAlert(
        '票數不足',
        `可用票數僅有 ${availableTickets.length} 張，無法抽出 ${drawQuantity} 位。`,
      );
      return;
    }

    setIsDrawing(true);

    try {
      // Shuffle and select winners
      const shuffled = shuffle(availableTickets);
      const winners = shuffled.slice(0, drawQuantity);

      // Update database atomically
      const batch = writeBatch(db);

      winners.forEach((winner) => {
        batch.update(doc(db, 'artifacts', APP_ID, 'public', 'data', 'tickets', winner.id), {
          isWinner: true,
          wonPrizeId: selectedPrizeId,
        });
      });

      const updatedWinners = [...(prize.winners || []), ...winners.map((w) => w.number)];
      batch.update(
        doc(db, 'artifacts', APP_ID, 'public', 'data', 'prizes', selectedPrizeId),
        { winners: updatedWinners },
      );

      await batch.commit();

      // Animation
      setDisplayStage('drawing');
      setShowConfetti(false);

      // Initialize animation state
      const animatingWinners = Array.from({ length: drawQuantity }, () => ({
        number: '000',
        locked: false,
      }));
      setCurrentWinners(animatingWinners);

      // Wait for stage change
      await delay(300);

      // Spinning animation (2 seconds)
      let isSpinning = true;
      const spinInterval = setInterval(() => {
        setCurrentWinners((prev) =>
          prev.map((item) => {
            if (item.locked) return item;
            return {
              number: Math.floor(Math.random() * 1000)
                .toString()
                .padStart(3, '0'),
              locked: false,
            };
          }),
        );
      }, 50);

      await delay(2000);
      isSpinning = false;
      clearInterval(spinInterval);

      // Reveal winners sequentially
      for (let i = 0; i < winners.length; i++) {
        setCurrentWinners((prev) => {
          const next = [...prev];
          next[i] = { number: winners[i].number, locked: true };
          return next;
        });
        if (i < winners.length - 1) {
          await delay(drawQuantity > 10 ? 200 : 600);
        }
      }

      await delay(1500);

      setDisplayStage('result');
      setShowConfetti(true);
    } catch (error) {
      showAlert('錯誤', error.message);
    } finally {
      setIsDrawing(false);
    }
  };

  // UI Components

  const StandbyScreen = () => {
    const grandPrizes = prizes.filter((p) => p.isGrandPrize);
    const normalPrizes = prizes.filter((p) => !p.isGrandPrize);

    return (
      <div className="h-full w-full flex flex-col p-6 max-w-[95vw] mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)] mb-4">
            {config.title}
          </h1>
          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <Ticket className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-400">總票：</span>
              <span className="font-mono text-white font-bold">{tickets.length}</span>
            </div>
            <div className="w-px h-4 bg-slate-700" />
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-400">待中：</span>
              <span className="font-mono text-white font-bold">{availableTickets.length}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-32 space-y-6">
          {grandPrizes.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-cyan-400 mb-4">🏆 特別獎項</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {grandPrizes.map((prize) => {
                  const remaining = Math.max(0, prize.quantity - (prize.winners?.length || 0));
                  const isAvailable = remaining > 0 && availableTickets.length > 0;

                  return (
                    <button
                      key={prize.id}
                      onClick={() => isAvailable && selectPrize(prize)}
                      disabled={!isAvailable}
                      className={`p-6 rounded-lg border-2 transition ${
                        isAvailable
                          ? 'border-yellow-400 bg-slate-800/50 hover:bg-yellow-500/10 cursor-pointer'
                          : 'border-slate-600 bg-slate-900/50 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <div className="text-lg font-bold text-yellow-400 mb-2">{prize.name}</div>
                      <div className="text-sm text-slate-400">
                        名額：<span className="text-white font-mono">{remaining}</span> /{' '}
                        {prize.quantity}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {normalPrizes.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-cyan-400 mb-4">🎁 一般獎項</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {normalPrizes.map((prize) => {
                  const remaining = Math.max(0, prize.quantity - (prize.winners?.length || 0));
                  const isAvailable = remaining > 0 && availableTickets.length > 0;

                  return (
                    <button
                      key={prize.id}
                      onClick={() => isAvailable && selectPrize(prize)}
                      disabled={!isAvailable}
                      className={`p-4 rounded-lg border transition text-center ${
                        isAvailable
                          ? 'border-cyan-400 bg-slate-800/50 hover:bg-cyan-500/10 cursor-pointer'
                          : 'border-slate-600 bg-slate-900/50 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <div className="font-bold text-cyan-400 text-sm mb-1">{prize.name}</div>
                      <div className="text-xs text-slate-400">
                        <span className="text-white font-mono">{remaining}</span>/{prize.quantity}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {prizes.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-4 opacity-50" />
              <p className="text-slate-400">還沒有設定任何獎項</p>
              <p className="text-slate-500 text-sm">點擊下方「後台管理」進入設定</p>
            </div>
          )}
        </div>

        <button
          onClick={() => setActiveTab('admin')}
          className="mt-6 w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <Settings className="w-5 h-5" />
          後台管理
        </button>
      </div>
    );
  };

  const ConfigQtyScreen = () => {
    const prize = prizes.find((p) => p.id === selectedPrizeId);
    if (!prize) return null;

    const remaining = Math.max(0, prize.quantity - (prize.winners?.length || 0));
    const maxDraw = Math.min(remaining, availableTickets.length);

    return (
      <div className="h-full w-full flex flex-col p-6 justify-between">
        <div>
          <button
            onClick={() => setDisplayStage('standby')}
            className="mb-6 flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft className="w-5 h-5" />
            返回
          </button>

          <h2 className="text-3xl font-bold text-cyan-400 mb-6">{prize.name}</h2>

          <div className="space-y-4 mb-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-1">剩餘名額</div>
              <div className="text-4xl font-bold text-cyan-400">{remaining}</div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
              <div className="text-sm text-slate-400 mb-1">可用票數</div>
              <div className="text-4xl font-bold text-emerald-400">{availableTickets.length}</div>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-slate-400 mb-3">抽獎數量</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDrawQuantity(Math.max(1, drawQuantity - 1))}
                disabled={drawQuantity <= 1}
                className="p-3 bg-slate-700 hover:bg-slate-600 rounded disabled:opacity-50"
              >
                <ArrowDown className="w-5 h-5 text-white" />
              </button>

              <input
                type="number"
                value={drawQuantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 1;
                  setDrawQuantity(Math.min(Math.max(1, val), maxDraw));
                }}
                min={1}
                max={maxDraw}
                className="flex-1 bg-slate-800 border border-slate-700 rounded px-4 py-3 text-white text-center font-mono text-2xl"
              />

              <button
                onClick={() => setDrawQuantity(Math.min(maxDraw, drawQuantity + 1))}
                disabled={drawQuantity >= maxDraw}
                className="p-3 bg-slate-700 hover:bg-slate-600 rounded disabled:opacity-50"
              >
                <ArrowUp className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="text-xs text-slate-500 mt-2 text-center">
              上限：{maxDraw}
            </div>
          </div>
        </div>

        <button
          onClick={executeDraw}
          disabled={isDrawing || drawQuantity <= 0 || drawQuantity > maxDraw}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 text-white font-bold py-4 rounded-lg text-lg transition"
        >
          {isDrawing ? '抽獎中...' : '開始抽獎'}
        </button>
      </div>
    );
  };

  const DrawingScreen = () => {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-cyan-400 text-center mb-8 drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            開獎中...
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {currentWinners.map((winner, index) => (
            <div
              key={index}
              className={`w-24 h-32 flex flex-col items-center justify-center rounded-lg border-2 transition ${
                winner.locked
                  ? 'border-emerald-400 bg-gradient-to-b from-emerald-900/40 to-slate-900 shadow-[0_0_30px_rgba(52,211,153,0.4)]'
                  : 'border-cyan-400 bg-gradient-to-b from-slate-800 to-slate-900 shadow-[0_0_20px_rgba(6,182,212,0.3)] animate-pulse'
              }`}
            >
              <div className="text-xs text-slate-400 mb-2">NO.</div>
              <div
                className={`text-5xl font-black font-mono transition ${
                  winner.locked ? 'text-emerald-400' : 'text-cyan-400'
                }`}
              >
                {winner.number}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </div>
    );
  };

  const ResultScreen = () => {
    return (
      <div className="h-full w-full flex flex-col p-6 bg-gradient-to-b from-slate-900 via-emerald-900/20 to-slate-900">
        {showConfetti && <Confetti />}

        <button
          onClick={() => {
            setDisplayStage('standby');
            setActiveTab('display');
          }}
          className="mb-6 flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
        >
          <ArrowLeft className="w-5 h-5" />
          返回
        </button>

        <h2 className="text-4xl font-black text-emerald-400 text-center mb-8 drop-shadow-[0_0_20px_rgba(52,211,153,0.4)]">
          🎉 恭喜中獎 🎉
        </h2>

        <div className="flex-1 overflow-y-auto mb-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {currentWinners.map((winner, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-b from-emerald-500/20 to-slate-900 border-2 border-emerald-400 rounded-lg text-center shadow-[0_0_15px_rgba(52,211,153,0.3)]"
              >
                <div className="text-sm text-slate-400 mb-2">幸運號碼</div>
                <div className="text-4xl font-black text-emerald-400 font-mono">{winner.number}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            setDisplayStage('standby');
            setActiveTab('display');
          }}
          className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold py-4 rounded-lg text-lg transition"
        >
          確定
        </button>
      </div>
    );
  };

  const AdminScreen = () => {
    return (
      <div className="h-full w-full flex flex-col p-6">
        <button
          onClick={() => {
            setDisplayStage('standby');
            setActiveTab('display');
          }}
          className="mb-6 flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
        >
          <ArrowLeft className="w-5 h-5" />
          返回
        </button>

        <div className="flex gap-4 mb-6 overflow-x-auto">
          {['prizes', 'tickets', 'results'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-bold transition whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {tab === 'prizes' && '獎項管理'}
              {tab === 'tickets' && '彩票管理'}
              {tab === 'results' && '結果管理'}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === 'prizes' && (
            <div className="space-y-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">新增獎項</h3>

                <input
                  type="text"
                  placeholder="獎項名稱"
                  value={newPrize.name}
                  onChange={(e) => setNewPrize({ ...newPrize, name: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white mb-3"
                />

                <input
                  type="number"
                  placeholder="數量"
                  value={newPrize.quantity}
                  onChange={(e) => setNewPrize({ ...newPrize, quantity: parseInt(e.target.value) || 1 })}
                  min={1}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white mb-3"
                />

                <label className="flex items-center gap-2 mb-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newPrize.isGrandPrize}
                    onChange={(e) => setNewPrize({ ...newPrize, isGrandPrize: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-white">大獎</span>
                </label>

                <button
                  onClick={addPrize}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 rounded flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  新增
                </button>
              </div>

              <div>
                <h3 className="text-lg font-bold text-cyan-400 mb-4">現有獎項</h3>
                <div className="space-y-2">
                  {prizes.map((prize) => {
                    const remaining = Math.max(0, prize.quantity - (prize.winners?.length || 0));

                    return (
                      <div
                        key={prize.id}
                        className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex justify-between items-center"
                      >
                        <div>
                          <div className="font-bold text-cyan-400">{prize.name}</div>
                          <div className="text-sm text-slate-400">
                            {remaining} / {prize.quantity} 剩餘
                          </div>
                        </div>

                        <button
                          onClick={() => deletePrize(prize.id)}
                          className="p-2 bg-red-600 hover:bg-red-700 rounded text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tickets' && (
            <div className="space-y-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">產生彩票</h3>

                <div>
                  <label className="text-slate-400 text-sm mb-1 block">最大號碼</label>
                  <input
                    type="number"
                    value={maxTicketNumber}
                    onChange={(e) => setMaxTicketNumber(parseInt(e.target.value) || 1)}
                    min={1}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white mb-3"
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-sm mb-1 block">每個號碼的數量</label>
                  <input
                    type="number"
                    value={ticketsPerNumber}
                    onChange={(e) => setTicketsPerNumber(parseInt(e.target.value) || 1)}
                    min={1}
                    className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white mb-3"
                  />
                </div>

                <button
                  onClick={generateTickets}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 rounded flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  產生
                </button>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="text-sm text-slate-400 mb-2">彩票統計</div>
                <div className="text-3xl font-bold text-cyan-400">{tickets.length}</div>
                <div className="text-xs text-slate-500 mt-1">
                  可用：{availableTickets.length} / 已中：{tickets.length - availableTickets.length}
                </div>
              </div>

              <button
                onClick={clearAllTickets}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded"
              >
                清空所有彩票
              </button>
            </div>
          )}

          {activeTab === 'results' && (
            <div className="space-y-6">
              <button
                onClick={clearAllResults}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded"
              >
                重置所有結果
              </button>

              {prizes.map((prize) => {
                const remaining = Math.max(0, prize.quantity - (prize.winners?.length || 0));

                return (
                  <div key={prize.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                    <h4 className="font-bold text-cyan-400 mb-2">{prize.name}</h4>
                    <div className="text-sm text-slate-400 mb-3">
                      已抽：{prize.winners?.length || 0} / {prize.quantity} | 剩餘：{remaining}
                    </div>
                    {prize.winners && prize.winners.length > 0 && (
                      <div className="text-xs text-slate-400">
                        號碼：{prize.winners.join(', ')}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!user) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-cyan-400">初始化中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white overflow-hidden">
      {displayStage === 'standby' && activeTab === 'display' && <StandbyScreen />}
      {displayStage === 'config-qty' && <ConfigQtyScreen />}
      {displayStage === 'drawing' && <DrawingScreen />}
      {displayStage === 'result' && <ResultScreen />}
      {activeTab === 'admin' && <AdminScreen />}

      {alert && (
        <Alert
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {confirm && (
        <Confirm
          title={confirm.title}
          message={confirm.message}
          onConfirm={() => confirm.onConfirm()}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}
