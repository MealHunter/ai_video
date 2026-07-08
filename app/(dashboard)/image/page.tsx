'use client';

import { useState } from 'react';
import NavBar from '../components/NavBar';

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0e0f0f] text-white overflow-hidden">
      <NavBar />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Parameters (560px fixed) */}
        <div className="w-[560px] border-r border-[#2a2a2a] bg-[#0e0f0f] flex flex-col overflow-y-auto">
          {/* Model Version Select */}
          <div className="p-6 border-b border-[#2a2a2a]">
            <div className="flex items-center gap-3 p-4 bg-[#171717] rounded border border-[#2a2a2a] hover:border-[#3a3a3a] cursor-pointer transition">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect fill='%236366f1' width='24' height='24' rx='4'/%3E%3C/svg%3E"
                alt="model"
                className="w-6 h-6"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">视频 3.0</div>
                <div className="text-xs text-[#a0a0a0] truncate">音画同步升级，主体一致性增强</div>
              </div>
              <svg className="w-4 h-4 text-[#a0a0a0] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>

          {/* Prompt Input Section */}
          <div className="flex-1 p-6 flex flex-col gap-6">
            {/* Frame Upload */}
            <div>
              <div className="text-sm font-medium mb-3">参考生图</div>
              <div className="border-2 border-dashed border-[#2a2a2a] rounded-lg p-8 text-center hover:border-[#6366f1] transition cursor-pointer">
                <svg className="w-8 h-8 mx-auto mb-2 text-[#a0a0a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <div className="text-sm text-[#a0a0a0]">点击上传图片</div>
              </div>
            </div>

            {/* Prompt Editor */}
            <div>
              <div className="text-sm font-medium mb-3">生成描述</div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="用引号标注角色说话/唱歌内容，例如：主持人说'看那远方的星星'"
                className="w-full h-40 bg-[#171717] border border-[#2a2a2a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#666666] focus:outline-none focus:border-[#6366f1] resize-none"
              />
              <div className="text-xs text-[#666666] mt-2">{prompt.length}/2000 个字符</div>
            </div>
          </div>

          {/* Settings & Generate Button */}
          <div className="p-6 border-t border-[#2a2a2a] space-y-4">
            {/* Settings */}
            <div className="flex items-center gap-3 p-3 bg-[#171717] border border-[#2a2a2a] rounded cursor-pointer hover:border-[#3a3a3a] transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
              <span className="text-sm flex-1">1080p · 5s · 16:9 · 1</span>
              <svg className="w-4 h-4 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            {/* Generate Button */}
            <button
              onClick={() => setIsGenerating(!isGenerating)}
              disabled={!prompt.trim() || isGenerating}
              className={`w-full py-3 rounded font-semibold transition flex items-center justify-center gap-2 ${
                isGenerating || !prompt.trim()
                  ? 'bg-[#333333] text-[#666666] cursor-not-allowed'
                  : 'bg-[#6366f1] text-white hover:bg-[#4f46e5]'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  生成中...
                </>
              ) : (
                '生成'
              )}
            </button>

            <div className="text-xs text-[#666666] text-center">内容由AI生成，禁止利用功能从事违法活动</div>
          </div>
        </div>

        {/* Right Panel - History */}
        <div className="flex-1 bg-[#171717] border-l border-[#2a2a2a] flex flex-col">
          {/* History Content */}
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-[#666666]">
                <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">释放你的创造潜力</p>
                <p className="text-sm text-[#666666]">体验可灵AI的魔力</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
