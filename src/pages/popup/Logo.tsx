import React from "react";
import { css, keyframes } from '@emotion/css';

type LogoBaseProps = {
    size: number
    children: React.ReactNode
    color1?: string
    color2?: string
    color4?: string
}
const LogoBase: React.FC<LogoBaseProps> = ({ size, color1 = "#317448", color2 = "#00A67E", color4 = "#FFC000", children }) => {
    const ratio = 0.1;
    const delta = size / 8;

    return (
        <div style={{ width: size, height: size, display: "flex", backgroundColor: color1, padding: Math.floor(size * ratio) + 'px', borderRadius: '999px' }}>
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
    const triangle_size = Math.floor(size * 0.3)

    return (
        <LogoBase size={size}>
            <div style={{display: "flex", justifyContent: "center", height: '100%', width: '100%'}}>
                <div style={{ 
                    clipPath: "polygon(0 0, 100% 50%, 0 100%)", 
                    width: triangle_size, 
                    height: triangle_size, 
                    marginLeft: triangle_size * 0.3 + 'px', 
                    backgroundColor: color3, 
                    alignSelf: 'center'}}>
                </div>
            </div>
        </LogoBase>
    )
}

const animations = {
    rotateTick: keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
    `,
    
}
type LogoRaderProps = {
    size: number
}
const LogoRader: React.FC<LogoRaderProps> = ({size}) => {
    return (
        <LogoBase size={size}>
            <div style={{height: '100%', width: '100%'}}>
                <div style={{
                    borderRight: "solid black", 
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


export  {Logo, LogoRader};