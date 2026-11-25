
'use client';
import StationAnalysisPanel from './StationAnalysisPanel';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import {
  Bot,
  Leaf,
  Send,
  Square,
  User,
  Trash2,
} from 'lucide-react';

type Message = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
};

const suggestions = [
  'What is the air quality situation in Ikeja?',
  'Give me a water quality summary.',
  'Which station has the highest temperature?',
  'Show me the current environmental alerts.',
];

export default function EnvironmentalAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content:
        'Hello! Welcome to EcoTrack Environmental Assistant. I can help you explore air quality, water quality, temperature readings, monitoring stations and environmental alerts. What would you like to know?',
    },
  ]);

  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const controllerRef = useRef<AbortController | null>(null);
const bottomRef = useRef<HTMLDivElement>(null);
const nextMessageId = useRef(2);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  useEffect(() => {
    return () => controllerRef.current?.abort();
  }, []);

  async function sendMessage(
    event?: FormEvent<HTMLFormElement>,
    suggestedQuestion?: string
  ) {
    event?.preventDefault();

    const question = (suggestedQuestion ?? input).trim();

    if (!question || isStreaming) return;
const userId = nextMessageId.current;
const assistantId = userId + 1;

nextMessageId.current += 2;
    setMessages(previous => [
      ...previous,
      {
        id: userId,
        role: 'user',
        content: question,
      },
      {
        id: assistantId,
        role: 'assistant',
        content: '',
      },
    ]);

    setInput('');
    setIsStreaming(true);

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error('Unable to connect to EcoTrack.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, {
          stream: true,
        });

        setMessages(previous =>
          previous.map(message =>
            message.id === assistantId
              ? {
                  ...message,
                  content: message.content + chunk,
                }
              : message
          )
        );
      }

      const remaining = decoder.decode();

      if (remaining) {
        setMessages(previous =>
          previous.map(message =>
            message.id === assistantId
              ? {
                  ...message,
                  content: message.content + remaining,
                }
              : message
          )
        );
      }
    } catch (error) {
      if (
        error instanceof Error &&
        error.name !== 'AbortError'
      ) {
        setMessages(previous =>
          previous.map(message =>
            message.id === assistantId
              ? {
                  ...message,
                  content:
                    'Sorry, I could not complete your request. Please try again.',
                }
              : message
          )
        );
      }
    } finally {
      controllerRef.current = null;
      setIsStreaming(false);
    }
  }

  function stopGeneration() {
    controllerRef.current?.abort();
    controllerRef.current = null;
    setIsStreaming(false);
  }

  function clearConversation() {
    if (isStreaming) stopGeneration();

    setMessages([
      {
        id: nextMessageId.current++,
        role: 'assistant',
        content:
          'Conversation cleared. What environmental information would you like to explore?',
      },
    ]);
  }

  return (
    <div className="flex h-[calc(100vh-150px)] min-h-[500px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b border-slate-200 p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-emerald-100 p-3 text-emerald-800">
            <Leaf size={23} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              EcoTrack Assistant
            </h2>
            <p className="text-xs text-emerald-700">
              Simulated environmental responses
            </p>
          </div>
        </div>

        <button
          onClick={clearConversation}
          disabled={isStreaming}
          aria-label="Clear conversation"
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-40"
        >
          <Trash2 size={19} />
        </button>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
      <StationAnalysisPanel />
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.role === 'user'
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            {message.role === 'assistant' && (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                <Bot size={19} />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7 ${
                message.role === 'user'
                  ? 'bg-emerald-800 text-white'
                  : 'border border-slate-200 bg-slate-50 text-slate-700'
              }`}
            >
              {message.role === 'assistant' && (
                <p className="mb-2 text-xs font-semibold text-emerald-800">
                  EcoTrack Assistant
                </p>
              )}

              <p className="whitespace-pre-wrap">
                {message.content}
                {message.role === 'assistant' &&
                  isStreaming &&
                  message.id === messages[messages.length - 1]?.id && (
                    <span className="ml-1 inline-block h-4 w-1 animate-pulse bg-emerald-600" />
                  )}
              </p>
            </div>

            {message.role === 'user' && (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-700">
                <User size={19} />
              </div>
            )}
          </div>
        ))}

        {!isStreaming && messages.length === 1 && (
          <div className="space-y-3 pt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Suggested questions
            </p>

            {suggestions.map(question => (
              <button
                key={question}
                onClick={() => sendMessage(undefined, question)}
                className="block w-full rounded-xl border border-slate-200 p-3 text-left text-sm text-slate-700 transition hover:border-emerald-400 hover:bg-emerald-50"
              >
                {question}
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="border-t border-slate-200 p-4">
        <p className="mb-3 text-center text-xs text-slate-400">
          Demonstration assistant · Not live AI or sensor data
        </p>

        <form
          onSubmit={sendMessage}
          className="flex items-end gap-2"
        >
          <textarea
            value={input}
            onChange={event => setInput(event.target.value)}
            onKeyDown={event => {
              if (
                event.key === 'Enter' &&
                !event.shiftKey &&
                !isStreaming
              ) {
                event.preventDefault();
                void sendMessage();
              }
            }}
            placeholder="Ask about environmental conditions..."
            rows={2}
            maxLength={1000}
            disabled={isStreaming}
            className="min-w-0 flex-1 resize-none rounded-xl border border-slate-300 p-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-slate-100"
          />

          {isStreaming ? (
            <button
              type="button"
              onClick={stopGeneration}
              aria-label="Stop response"
              className="rounded-xl bg-red-600 p-3 text-white hover:bg-red-700"
            >
              <Square size={19} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send message"
              className="rounded-xl bg-emerald-800 p-3 text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={19} />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
