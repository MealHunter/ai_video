'use client';

import { useState } from 'react';
import NavBar from '../components/NavBar';

export default function MotionControlPage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [motionVideoUploaded, setMotionVideoUploaded] = useState(false);
  const [humanImageUploaded, setHumanImageUploaded] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [resolution, setResolution] = useState('720p');
  const [videoCount, setVideoCount] = useState(1);
  const [selectedModel, setSelectedModel] = useState('3.0');

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0e0f0f] text-white overflow-hidden">
      <NavBar />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Parameters (full width) */}
        <div className="w-[560px] border-r border-[#2a2a2a] bg-[#0e0f0f] flex flex-col overflow-y-auto">
          {/* Model Version Select */}
          <div className="p-6 border-b border-[#2a2a2a] relative">
            <button
              onClick={() => setShowModelDropdown(!showModelDropdown)}
              className="flex items-center gap-3 p-4 bg-[#171717] rounded border border-[#2a2a2a] hover:border-[#3a3a3a] cursor-pointer transition w-full"
            >
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect fill='%236366f1' width='24' height='24' rx='4'/%3E%3C/svg%3E"
                alt="model"
                className="w-6 h-6"
              />
              <div className="flex-1 min-w-0 text-left">
                <div className="text-sm font-medium">视频 {selectedModel}</div>
                <div className="text-xs text-[#a0a0a0] truncate">
                  {selectedModel === '3.0' && '动态捕捉全面升级，角色面部高度一致'}
                  {selectedModel === '2.6' && '音画同步生成，有声音更精彩'}
                </div>
              </div>
              <svg className="w-4 h-4 text-[#a0a0a0] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {/* Model Dropdown */}
            {showModelDropdown && (
              <div className="absolute top-full left-6 right-6 mt-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden z-50">
                {[
                  { version: '3.0', desc: '动态捕捉全面升级，角色面部高度一致' },
                  { version: '2.6', desc: '音画同步生成，有声音更精彩' },
                ].map((model) => (
                  <button
                    key={model.version}
                    onClick={() => {
                      setSelectedModel(model.version);
                      setShowModelDropdown(false);
                    }}
                    className={`w-full flex items-center gap-3 p-4 transition ${
                      selectedModel === model.version
                        ? 'bg-[#2a3a5a]'
                        : 'hover:bg-[#171717]'
                    }`}
                  >
                    <img
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect fill='%236366f1' width='24' height='24' rx='4'/%3E%3C/svg%3E"
                      alt="model"
                      className="w-6 h-6"
                    />
                    <div className="flex-1 min-w-0 text-left">
                      <div className="text-sm font-medium">视频 {model.version}</div>
                      <div className="text-xs text-[#a0a0a0] truncate">{model.desc}</div>
                    </div>
                    {selectedModel === model.version && (
                      <svg className="w-4 h-4 text-[#6366f1] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Upload Section */}
          <div className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto">
            {/* Upload Container - Motion Video and Human Image side by side */}
            <div className="flex gap-6">
              {/* Motion Video Upload with Radio */}
              <div className="flex-1 flex flex-col gap-3">
                <div className="text-sm font-medium">动作的视频</div>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center transition cursor-pointer h-40 flex flex-col items-center justify-center ${
                  motionVideoUploaded
                    ? 'border-[#6366f1] bg-[#0f0f0f]'
                    : 'border-[#2a2a2a] hover:border-[#6366f1]'
                }`}>
                  {motionVideoUploaded ? (
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-8 h-8 text-[#6366f1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div className="text-sm text-white">已上传</div>
                      <button
                        onClick={() => setMotionVideoUploaded(false)}
                        className="text-xs text-[#6366f1] hover:text-white transition"
                      >
                        重新上传
                      </button>
                    </div>
                  ) : (
                    <>
                      <svg className="w-6 h-6 mb-2 text-[#a0a0a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <div className="text-sm text-[#a0a0a0]">点击上传</div>
                      <div className="text-xs text-[#666666]">MP4、MOV</div>
                    </>
                  )}
                </div>
                {/* Radio: Scene Direction */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="direction" className="w-4 h-4" defaultChecked />
                  <span className="text-xs text-white">人物朝向与视频一致</span>
                </label>
              </div>

              {/* Human Image Upload with Radio */}
              <div className="flex-1 flex flex-col gap-3">
                <div className="text-sm font-medium">人物图</div>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center transition cursor-pointer h-40 flex flex-col items-center justify-center ${
                  humanImageUploaded
                    ? 'border-[#6366f1] bg-[#0f0f0f]'
                    : 'border-[#2a2a2a] hover:border-[#6366f1]'
                }`}>
                  {humanImageUploaded ? (
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-8 h-8 text-[#6366f1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <div className="text-sm text-white">已上传</div>
                      <button
                        onClick={() => setHumanImageUploaded(false)}
                        className="text-xs text-[#6366f1] hover:text-white transition"
                      >
                        重新上传
                      </button>
                    </div>
                  ) : (
                    <>
                      <svg className="w-6 h-6 mb-2 text-[#a0a0a0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <div className="text-sm text-[#a0a0a0]">点击上传</div>
                      <div className="text-xs text-[#666666]">JPG、PNG</div>
                    </>
                  )}
                </div>
                {/* Radio: Image Direction */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="direction" className="w-4 h-4" />
                  <span className="text-xs text-white">人物朝向与图片一致</span>
                </label>
              </div>
            </div>

            {/* Prompt Editor */}
            <div>
              <div className="text-sm font-medium mb-3">生成描述</div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="人物朝向和视频一致时复杂动作表现更好，和图片一致时响应运镜。请参考上传规范进行上传。"
                className="w-full h-32 bg-[#171717] border border-[#2a2a2a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#666666] focus:outline-none focus:border-[#6366f1] resize-none"
              />
              <div className="text-xs text-[#666666] mt-2">{prompt.length}/2000 个字符</div>
            </div>
          </div>

          {/* Settings & Generate Button */}
          <div className="p-6 border-t border-[#2a2a2a] space-y-4 relative">
            {/* Settings Button */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-3 p-3 bg-[#171717] border border-[#2a2a2a] rounded cursor-pointer hover:border-[#3a3a3a] transition w-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
              <span className="text-sm flex-1">{resolution} · {videoCount}</span>
              <svg className="w-4 h-4 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {/* Settings Popover */}
            {showSettings && (
              <div className="absolute bottom-full right-0 mb-2 w-80 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4 space-y-4 z-50">
                {/* Generation Mode */}
                <div>
                  <div className="text-xs font-medium text-[#a0a0a0] mb-2">生成模式</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setResolution('720p')}
                      className={`flex-1 py-2 rounded text-sm transition ${
                        resolution === '720p'
                          ? 'bg-[#6366f1] text-white'
                          : 'bg-[#171717] text-[#a0a0a0] hover:text-white'
                      }`}
                    >
                      720p
                    </button>
                    <button
                      onClick={() => setResolution('1080p')}
                      className={`flex-1 py-2 rounded text-sm transition ${
                        resolution === '1080p'
                          ? 'bg-[#6366f1] text-white'
                          : 'bg-[#171717] text-[#a0a0a0] hover:text-white'
                      }`}
                    >
                      1080p
                    </button>
                  </div>
                </div>

                {/* Video Count */}
                <div>
                  <div className="text-xs font-medium text-[#a0a0a0] mb-2">生成数量</div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4].map((count) => (
                      <button
                        key={count}
                        onClick={() => setVideoCount(count)}
                        className={`flex-1 py-2 rounded text-sm transition ${
                          videoCount === count
                            ? 'bg-[#6366f1] text-white'
                            : 'bg-[#171717] text-[#a0a0a0] hover:text-white'
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={() => {
                if (motionVideoUploaded && humanImageUploaded) {
                  setIsGenerating(!isGenerating);
                }
              }}
              disabled={!motionVideoUploaded || !humanImageUploaded || isGenerating}
              className={`w-full py-3 rounded font-semibold transition flex items-center justify-center gap-2 ${
                isGenerating || !motionVideoUploaded || !humanImageUploaded
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
