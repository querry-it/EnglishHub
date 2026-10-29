import React, { useId } from 'react';

export default function LoadingBird({ label = 'Đang tải...', size = 160, className = '' }) {
  const id = useId().replace(/:/g, '');
  const bodyGradient = `${id}-body`;
  const wingGradient = `${id}-wing`;
  const bellyGradient = `${id}-belly`;
  const beakGradient = `${id}-beak`;
  const shadowFilter = `${id}-shadow`;

  return (
    <div className={`loading-bird ${className}`} role="status" aria-live="polite">
      <svg
        className="loading-bird__svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 320"
        width={size}
        height={size}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={bodyGradient} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#65CBFF" />
            <stop offset=".55" stopColor="#42A8EE" />
            <stop offset="1" stopColor="#2584D3" />
          </linearGradient>
          <linearGradient id={wingGradient} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#78D5FF" />
            <stop offset="1" stopColor="#2589DB" />
          </linearGradient>
          <linearGradient id={bellyGradient} x1="0" y1="0" x2=".3" y2="1">
            <stop stopColor="#DDF5FF" />
            <stop offset="1" stopColor="#9DDCFA" />
          </linearGradient>
          <linearGradient id={beakGradient} x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#FFE34D" />
            <stop offset="1" stopColor="#FFAD16" />
          </linearGradient>
          <filter id={shadowFilter} x="-30%" y="-30%" width="160%" height="170%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        <ellipse cx="160" cy="294" rx="53" ry="9" fill="#8CCBEE" opacity=".32" filter={`url(#${shadowFilter})`} />
        <ellipse cx="160" cy="294" rx="48" ry="6" fill="#9FD6F7" opacity=".45" />

        <g className="loading-bird__motion" fill="none" stroke="#64BFFF" strokeWidth="4" strokeLinecap="round">
          <path d="M49 122 Q35 142 39 160" />
          <path d="M36 145 Q28 163 32 177" />
          <path d="M271 122 Q285 142 281 160" />
          <path d="M284 145 Q292 163 288 177" />
        </g>

        <g fill="#268BD8">
          <path d="M137 221 Q110 238 124 250 Q143 246 151 224" />
          <path d="M153 225 Q140 248 158 252 Q170 243 166 225" />
        </g>

        <g className="loading-bird__left-wing">
          <path d="M112 139 Q75 101 54 117 Q43 131 65 163 Q78 181 111 185Z" fill="#278BD8" />
          <path d="M111 143 Q76 111 61 124 Q54 136 75 160 Q91 176 112 178Z" fill={`url(#${wingGradient})`} />
          <path d="M107 176 Q78 166 72 182 Q73 199 101 197 Q111 191 114 182Z" fill="#318FDC" />
          <path d="M104 191 Q83 188 82 203 Q88 216 108 204Z" fill="#2584D3" />
        </g>

        <g className="loading-bird__right-wing">
          <path d="M208 139 Q245 101 266 117 Q277 131 255 163 Q242 181 209 185Z" fill="#278BD8" />
          <path d="M209 143 Q244 111 259 124 Q266 136 245 160 Q229 176 208 178Z" fill={`url(#${wingGradient})`} />
          <path d="M213 176 Q242 166 248 182 Q247 199 219 197 Q209 191 206 182Z" fill="#318FDC" />
          <path d="M216 191 Q237 188 238 203 Q232 216 212 204Z" fill="#2584D3" />
        </g>

        <g className="loading-bird__feet" stroke="#FF8A22" strokeWidth="6" strokeLinecap="round" fill="none">
          <path d="M143 247 L140 258 M140 255 L132 259 M140 255 L145 260" />
          <path d="M177 247 L180 258 M180 255 L188 259 M180 255 L175 260" />
        </g>

        <g className="loading-bird__body">
          <path d="M160 83 C116 83 91 115 91 164 C91 213 117 248 160 253 C203 248 229 213 229 164 C229 115 204 83 160 83Z" fill={`url(#${bodyGradient})`} />
          <path d="M119 104 C99 125 98 167 108 195 Q113 218 130 234 Q105 218 98 190 C85 147 97 112 119 104Z" fill="#1678C6" opacity=".24" />
          <path d="M130 199 C140 190 178 190 190 201 C202 212 191 238 160 244 C130 240 118 218 130 199Z" fill={`url(#${bellyGradient})`} />
          <path d="M148 87 Q140 70 148 74 L158 84 Q159 63 165 73 L166 87 Q180 70 180 80 L173 91Z" fill="#2689D6" stroke="#2689D6" strokeWidth="2" strokeLinejoin="round" />
          <g fill="none" stroke="#17466A" strokeWidth="4" strokeLinecap="round">
            <path d="M117 124 Q129 114 140 122" />
            <path d="M180 122 Q192 114 203 124" />
          </g>
          <ellipse cx="128" cy="144" rx="18" ry="20" fill="#F8FCFF" />
          <ellipse cx="192" cy="144" rx="18" ry="20" fill="#F8FCFF" />
          <ellipse cx="132" cy="146" rx="11" ry="14" fill="#163957" />
          <ellipse cx="196" cy="146" rx="11" ry="14" fill="#163957" />
          <g fill="white">
            <circle cx="135" cy="140" r="4.5" />
            <circle cx="199" cy="140" r="4.5" />
            <circle cx="127" cy="150" r="2" />
            <circle cx="191" cy="150" r="2" />
          </g>
          <g fill="none" stroke="#173C59" strokeWidth="3.8">
            <rect x="105" y="128" width="45" height="37" rx="16" />
            <rect x="170" y="128" width="45" height="37" rx="16" />
            <path d="M150 137 Q160 132 170 137" />
            <path d="M105 136 L98 132" />
            <path d="M215 136 L222 132" />
          </g>
          <g fill="#D8F4FF" opacity=".8">
            <ellipse cx="115" cy="134" rx="5" ry="2.5" transform="rotate(-30 115 134)" />
            <ellipse cx="180" cy="134" rx="5" ry="2.5" transform="rotate(-30 180 134)" />
          </g>
          <ellipse cx="111" cy="174" rx="11" ry="6" fill="#FF9EB8" opacity=".9" />
          <ellipse cx="209" cy="174" rx="11" ry="6" fill="#FF9EB8" opacity=".9" />
          <path d="M160 151 Q144 145 147 157 Q150 165 160 166 Q170 165 173 157 Q176 145 160 151Z" fill={`url(#${beakGradient})`} />
          <path d="M149 159 Q160 166 171 159 Q170 178 160 179 Q150 177 149 159Z" fill="#FF7C32" />
          <path d="M153 160 Q160 164 167 160 Q163 166 157 165Z" fill="#FFCA4A" />
          <ellipse cx="130" cy="100" rx="11" ry="4" fill="#C4EDFF" opacity=".5" transform="rotate(-38 130 100)" />
          <circle cx="142" cy="94" r="3" fill="#D8F5FF" opacity=".65" />
        </g>
      </svg>
      <span className="loading-bird__label">{label}</span>
    </div>
  );
}
