import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Sparkles, MessageCircle, X, Send, Zap, Clock, BookOpen, CheckCircle2, Check } from "lucide-react";

const FLOW_SCHEDULE = [
  { time: "8:00 AM", task: "Morning Review — Recap yesterday's notes", icon: "book" },
  { time: "9:30 AM", task: "Assignment A — Data Structures Problem Set", icon: "zap" },
  { time: "11:00 AM", task: "Break — Hydrate & stretch", icon: "check" },
  { time: "11:30 AM", task: "Lab Prep — Pre-read networking lab manual", icon: "book" },
  { time: "1:00 PM", task: "Lunch & Recharge", icon: "check" },
  { time: "2:00 PM", task: "Revision B — Operating Systems Ch. 4–6", icon: "book" },
  { time: "3:30 PM", task: "Group Study — Project discussion & planning", icon: "zap" },
  { time: "5:00 PM", task: "Evening Wrap-up — Summarize key takeaways", icon: "check" },
];

const CHAT_MESSAGES = [
  { role: "bot", text: "Hey there! 👋 I'm Blue, your AI study assistant. How can I help you today?" },
];

const KNOWLEDGE_BASE = [
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    answer: "Hello! 😊 I'm Blue. I can help with info about Blue Current, task tracking, and your study flow. What would you like to know?",
  },
  {
    keywords: ["what", "blue current", "about", "app", "this"],
    answer: "Blue Current is your Polytechnic study companion. You can track tasks, generate an AI-powered study schedule ('Flow'), and chat with me for quick answers — all in one place.",
  },
  {
    keywords: ["task", "tracker", "add", "todo", "to-do", "checklist"],
    answer: "The Task Tracker lets you add a task with a description, deadline, and effort level. Hit Submit and it appears in your list — use the checkbox to mark it done, or the trash icon to delete it.",
  },
  {
    keywords: ["flow", "generate", "schedule", "ai flow", "study plan"],
    answer: "Click 'Generate My Flow' and I'll build a sample study schedule for your day — blocks for review, assignments, revision, breaks, and a wrap-up. It's a great starting point you can tweak!",
  },
  {
    keywords: ["deadline", "date", "due", "target"],
    answer: "Pick a target deadline when adding a task — it'll show as a small clock icon next to the task so you can see what's coming up at a glance.",
  },
  {
    keywords: ["effort", "quick", "moderate", "deep work", "level"],
    answer: "Effort Required helps you gauge your tasks: Quick (a few minutes), Moderate (30–60 min), or Deep Work (focused, multi-hour sessions). Choose what fits each task.",
  },
  {
    keywords: ["delete", "remove", "trash", "clear"],
    answer: "To remove a task, click the trash icon on the right side of any task card. It'll disappear instantly.",
  },
  {
    keywords: ["chat", "bot", "help", "what can you do", "who are you"],
    answer: "I'm Blue, your in-app assistant. Ask me about Blue Current features, the Task Tracker, the Flow Generator, deadlines, or effort levels — and I'll do my best to help!",
  },
  {
    keywords: ["polytechnic", "study", "revision", "exam", "assignment"],
    answer: "Blue Current is built for polytechnic life — track assignments, set deadlines, generate study flows for revision, and keep everything organized in one dashboard.",
  },
];

const findAnswer = (text) => {
  const lower = text.toLowerCase();
  for (const entry of KNOWLEDGE_BASE) {
    if (entry.keywords.some(kw => lower.includes(kw))) {
      return entry.answer;
    }
  }
  return null;
};

function FlowIcon({ type }) {
  if (type === "zap") return <Zap className="w-4 h-4" />;
  if (type === "book") return <BookOpen className="w-4 h-4" />;
  return <CheckCircle2 className="w-4 h-4" />;
}

function HeroSection({ onScrollToTasks }) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 -right-20 w-[400px] h-[400px] rounded-full bg-blue-600/20 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute -bottom-20 left-1/3 w-[350px] h-[350px] rounded-full bg-indigo-500/15 blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-cyan-300 text-sm mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Study Flow
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
            Blue Current
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg sm:text-xl text-blue-100/70 font-light mb-10 max-w-md mx-auto leading-relaxed"
        >
          Your Polytechnic Flow, Simplified.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onScrollToTasks}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow"
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );
}

const WEBHOOK_URL = "https://n8ngc.codeblazar.org/form/e0f81978-07e2-42d3-a186-4cb8470cd834";

function TaskTracker() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [effort, setEffort] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const descRef = useRef(null);

  const resetForm = () => {
    setDescription("");
    setDeadline("");
    setEffort("");
    descRef.current?.focus();
  };

  const toggleDone = (id) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleSubmit = async () => {
    const trimmed = description.trim();
    if (!trimmed) {
      descRef.current?.focus();
      return;
    }
    const payload = {
      task_description: trimmed,
      target_deadline: deadline,
      effort_required: effort,
    };
    setSubmitting(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Webhook submission failed:", err);
    } finally {
      setSubmitting(false);
    }
    setTasks(prev => [
      ...prev,
      { id: Date.now(), text: trimmed, deadline, effort, done: false },
    ]);
    resetForm();
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8">
      <h3 className="text-xl font-semibold text-white mb-1">Task Tracker</h3>
      <p className="text-sm text-blue-200/50 mb-6">Keep your study flow organized</p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-xs text-blue-200/60 mb-1.5">Task Description</label>
          <input
            ref={descRef}
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            placeholder="What do you need to do?"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-blue-200/30 text-sm focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.07] transition-all"
          />
        </div>

        <div>
          <label className="block text-xs text-blue-200/60 mb-1.5">Target Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.07] transition-all [color-scheme:dark]"
          />
        </div>

        <div>
          <label className="block text-xs text-blue-200/60 mb-1.5">Effort Required</label>
          <select
            value={effort}
            onChange={e => setEffort(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.07] transition-all appearance-none cursor-pointer"
          >
            <option value="" disabled className="bg-[#0d1530]">Select effort level…</option>
            <option value="Quick" className="bg-[#0d1530]">Quick</option>
            <option value="Moderate" className="bg-[#0d1530]">Moderate</option>
            <option value="Deep Work" className="bg-[#0d1530]">Deep Work</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: submitting ? 1 : 1.02 }}
          whileTap={{ scale: submitting ? 1 : 0.98 }}
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
        >
          {submitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Submitting…
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Submit
            </>
          )}
        </motion.button>
      </div>

      <div className="space-y-2 min-h-[60px]">
        <AnimatePresence mode="popLayout">
          {tasks.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-blue-200/30 text-sm text-center py-8"
            >
              No tasks yet — add one above to get started
            </motion.p>
          )}
          {tasks.map(task => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              layout
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5 group hover:bg-white/[0.08] transition-colors"
            >
              <button
                onClick={() => toggleDone(task.id)}
                className={`shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                  task.done
                    ? "bg-gradient-to-br from-cyan-500 to-blue-600 border-cyan-400/50"
                    : "bg-white/5 border-white/20 hover:border-cyan-400/50"
                }`}
              >
                {task.done && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
              <div className="flex-1 min-w-0">
                <span className={`text-sm block truncate ${task.done ? "text-blue-200/40 line-through" : "text-blue-50/90"}`}>
                  {task.text}
                </span>
                {(task.deadline || task.effort) && (
                  <span className="text-xs text-blue-200/40 flex items-center gap-2 mt-0.5">
                    {task.deadline && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{task.deadline}</span>}
                    {task.effort && <span className="px-1.5 py-0.5 rounded bg-white/5 text-cyan-300/70">{task.effort}</span>}
                  </span>
                )}
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-400/40 hover:text-red-400 transition-colors shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FlowGenerator() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="glass-card rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center mb-5 border border-cyan-400/10">
          <Sparkles className="w-6 h-6 text-cyan-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">AI Flow Generator</h3>
        <p className="text-sm text-blue-200/50 mb-6 max-w-xs">
          Let AI craft the perfect study schedule tailored to your day
        </p>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setOpen(true)}
          className="px-7 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow flex items-center gap-2"
        >
          <Zap className="w-4 h-4" />
          Generate My Flow
        </motion.button>
      </div>

      {/* Flow Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="glass-card rounded-3xl p-6 sm:p-8 w-full max-w-md max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center border border-cyan-400/10">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Your Study Flow</h3>
                    <p className="text-xs text-blue-200/40">AI-generated schedule</p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="text-blue-200/40 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {FLOW_SCHEDULE.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-4 px-4 py-3 rounded-xl bg-white/5 border border-white/5"
                  >
                    <div className="flex flex-col items-center gap-1 pt-0.5">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                        <FlowIcon type={item.icon} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-medium text-cyan-400/80 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </span>
                      <p className="text-sm text-blue-50/80 mt-0.5">{item.task}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages(prev => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setTimeout(() => {
      const matched = findAnswer(trimmed);
      setMessages(prev => [
        ...prev,
        { role: "bot", text: matched || "Thanks for your message! This is a demo — full AI responses coming soon. 🚀" },
      ]);
    }, 800);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xl shadow-cyan-500/30 flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-6 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="glass-card rounded-t-3xl sm:rounded-3xl w-full sm:w-96 h-[70vh] sm:h-[500px] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Blue Assistant</h4>
                    <span className="text-xs text-green-400/70 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                      Online
                    </span>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="text-blue-200/40 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-md"
                          : "bg-white/[0.07] text-blue-50/80 border border-white/5 rounded-bl-md"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-white/5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message…"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-blue-200/30 focus:outline-none focus:border-cyan-400/50 transition-all"
                  />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={sendMessage}
                    className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Home() {
  const tasksRef = useRef(null);

  const scrollToTasks = () => {
    tasksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#060d1f] text-white relative">
      <HeroSection onScrollToTasks={scrollToTasks} />

      <section ref={tasksRef} className="max-w-4xl mx-auto px-4 pb-32 -mt-10">
        <div className="grid md:grid-cols-2 gap-6">
          <TaskTracker />
          <FlowGenerator />
        </div>
      </section>

      <ChatBot />
    </div>
  );
}