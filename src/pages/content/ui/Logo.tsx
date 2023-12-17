import React, {useState} from "react";
import { css, keyframes } from '@emotion/css';

type LogoBaseProps = {
    size: number
    children: React.ReactNode
    color1?: string
    color2?: string
    color4?: string
    onMouseEnter?: () => void;  // マウスがエレメント上に入った時のイベントハンドラを追加
    onMouseLeave?: () => void;  // マウスがエレメントから離れた時のイベントハンドラを追加
}

const LogoBase: React.FC<LogoBaseProps> = ({ size, color1 = "#000", color2 = "#000", color4 = "#00A67E", children,onMouseEnter,onMouseLeave}) => {
    const ratio = 0.1;
    const delta = size / 8;

    return (
        <div style={{ width: size, height: size, display: "flex", backgroundColor: color1, padding: Math.floor(size * ratio) + 'px', borderRadius: '999px' }} onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
            <div style={{
                flex: 1, backgroundImage: `repeating-linear-gradient(
                    90deg,
                    ${color4} ,
                    ${color4} 0.5px,
                    transparent 1px,
                    transparent ${delta}px
                  ),
                  repeating-linear-gradient(
                    0deg,
                    ${color4} ,
                    ${color4} 0.5px,
                    ${color2} 1px,
                    ${color2} ${delta}px
                  )`, borderRadius: '999px', display: "block"
            }}>
                {children}
            </div>
        </div>
    )
}

type LogoProps = {
    size: number
    color3?: string
}
const Logo: React.FC<LogoProps> = ({ size, color3 = "#FF0000" }) => {
    const [isHovered, setIsHovered] = useState(false); // マウスカーソルの状態を追跡するstate
    const triangle_size = Math.floor(size * 0.3);

    // '!'マークのスタイル
    const exclamationStyle = {
        fontSize: `${triangle_size * 3}px`, // 文字サイズを三角形のサイズに合わせます
        color: color3, // 色を赤色に設定
        alignSelf: 'center', // 中央揃え
    };

    // マウスカーソルがコンポーネント上にあるかどうかに基づいて表示を切り替える
    const content = isHovered ? (
        <div style={exclamationStyle}>!</div>
    ) : (
        <div style={{ 
            clipPath: "polygon(0 0, 100% 50%, 0 100%)", 
            width: triangle_size, 
            height: triangle_size, 
            marginLeft: triangle_size * 0.3 + 'px', 
            backgroundColor: color3, 
            alignSelf: 'center'
        }}></div>
    );

    return (
        <LogoBase size={size} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div style={{ display: "flex", justifyContent: "center", height: '100%', width: '100%' }}>
            {content}
            </div>
        </LogoBase>
    )
}


const animations = {
    rotateTick: keyframes`
    0% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(0deg);
    }
    `
}
type LogoRaderProps = {
    size: number
}
const LogoRader: React.FC<LogoRaderProps> = ({ size }) => {
    return (
        <LogoBase size={size}>
            <div style={{ height: '100%', width: '100%' }}>
                <div style={{
                    borderRight: "solid gray",
                    boxShadow: "10px 0px 10px -3px red",
                    borderWidth: "2px",
                    width: 'calc(50% - 2px)',
                    height: 'calc(50% - 2px)',
                    transformOrigin: "bottom right",
                    animation: `${animations.rotateTick} 3s linear infinite`,
                }}>
                </div>
            </div>
        </LogoBase>
    )
}

const createColorAnimation = (size, base: string, color: string) => {
    const color2 = "#000";
    const color4 = "#00A67E";
    const delta = size / 8;

    return keyframes`
        0% {
            background: 
                repeating-linear-gradient(
                    90deg,
                    ${color4} ,
                    ${color4} 0.5px,
                    transparent 1px,
                    transparent ${delta}px
                ),
                repeating-linear-gradient(
                    0deg,
                    ${color4} ,
                    ${color4} 0.5px,
                    ${color2} 1px,
                    ${color2} ${delta}px
                );
            
        }
        100% {
            background: ${color};
        }
    `;
}
type LogoResultProps = {
    size: number
    score: number
}
const LogoResult: React.FC<LogoResultProps> = ({ size, score }) => {
    var target_color = undefined;
    if (score < 25) {
        target_color = "#0000ff";
    } else if (score < 50) {
        target_color = "#00ff62";
    } else if (score < 75) {
        target_color = "#ff9500";
    } else {
        target_color = "#ff0000";
    }
    
    const color1 = "#000";
    const color2 = "#000";
    const color4 = "#00A67E";
    const ratio = 0.1;
    const delta = size / 8;

    return (
        <div style={{ width: size, height: size, display: "flex", backgroundColor: color1, padding: Math.floor(size * ratio) + 'px', borderRadius: '999px' }}>
            <div style={{
                flex: 1, 
                animation: `${createColorAnimation(size, color2, target_color)} 2s linear`,
                animationFillMode: "forwards", 
                borderRadius: '999px', 
                display: "block"
            }}>
                <div style={{ height: '100%', width: '100%', fontSize: size / 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    {score}
                </div>
            </div>
        </div>
    )
}


export { Logo, LogoRader, LogoResult};