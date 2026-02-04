import React from 'react';

function SleepyTrain() {
    return (
        <div className="text-center mt-5 mb-3">
            <style>
                {`
           .sleep-animation {
             animation: drift 3s infinite;
          }

            .sleep-animation-delayed {
                animation: drift 3s infinite 1.5s;
            }
          .regionaljet-container {
            animation: rock-gently 5s ease-in-out infinite;
            transform-origin: 50% 90%;
          }
          @keyframes rock-gently {
            0%, 100% { transform: rotate(-0.5deg); }
            50% { transform: rotate(0.5deg); }
          }
          .zzz {
            font-family: sans-serif;
            font-weight: bold;
            fill: #6c757d;
            opacity: 0;
            animation: float-up 4s infinite ease-out;
          }
          .z1 { animation-delay: 0s; }
          .z2 { animation-delay: 1.3s; }
          @keyframes float-up {
            0% { transform: translate(0, 0); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translate(10px, -30px); opacity: 0; }
          }
          .footer-art {
            margin-top: 50px;
            text-align: center;
            opacity: 0.8;
        }
        
        .footer-art svg {
            width: 250px;
            height: auto;
        }
        `}
            </style>
            <svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="40" width="140" height="25" rx="2" fill="#e2001a"/>
                <rect x="20" y="45" width="140" height="15" fill="white"/>

                <rect x="30" y="48" width="15" height="8" rx="1" fill="#333"/>
                <rect x="50" y="48" width="20" height="8" rx="1" fill="#333"/>
                <rect x="75" y="48" width="20" height="8" rx="1" fill="#333"/>
                <rect x="100" y="48" width="20" height="8" rx="1" fill="#333"/>

                <path d="M160 40 Q175 40 175 55 L175 65 L160 65 Z" fill="#e2001a"/>
                <path d="M162 45 Q170 45 170 52 L170 58 L162 58 Z" fill="#333"/>
                <circle cx="40" cy="68" r="4" fill="#333"/>
                <circle cx="140" cy="68" r="4" fill="#333"/>

                <g transform="translate(155, 25) rotate(-10)">
                    <path d="M0 20 Q10 0 30 15 L25 25 Q10 15 0 25 Z" fill="#005eb8"/>
                    <path d="M0 22 Q5 23 10 21" stroke="white" fill="none"/>
                    <circle cx="32" cy="18" r="5" fill="white"/>
                    <rect x="-2" y="20" width="15" height="6" rx="2" fill="white"/>
                </g>

                <text x="175" y="30" font-family="Arial" font-size="6" fill="#999" className="sleep-animation">Z</text>
                <text x="182" y="22" font-family="Arial" font-size="8" fill="#999" className="sleep-animation-delayed">Z
                </text>
            </svg>
        </div>
    );
}

export default SleepyTrain;
