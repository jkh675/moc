import * as React from 'react'
import styles from './Button.module.css'

interface ButtonProps {
    variant?: 'acrylic' | 'plastic' | 'gaussian' | 'mica' | 'frosted'
    theme?: 'dark' | 'light'
    transparent?: boolean
    transparency?: 100 | 90 | 80 | 70 | 60 | 50 | 40 | 30 | 20 | 10 | 0
    text: string
}

export default function Button(props: ButtonProps) {
    var variantString: string = styles.MOCButton
    // #region class contructor
    switch (props.variant) {
        case 'acrylic':
            variantString += ' '
            variantString += styles.MOCButtonAcrylic
            break
        case 'plastic':
            variantString += ' '
            variantString += styles.MOCButtonPlastic
            break
        case 'gaussian':
            variantString += ' '
            variantString += styles.MOCButtonGaussian
            break
        case 'mica':
            variantString += ' '
            variantString += styles.MOCButtonMica
            break
        case 'frosted':
            variantString += ' '
            variantString += styles.MOCButtonFrosted
            break
        default:
            variantString += ' '
            variantString += styles.MOCButtonAcrylic
            break
    }
    switch (props.theme) {
        case 'dark':
            variantString += ' '
            variantString += styles.MOCButtonDark
            break
        case 'light':
            variantString += ' '
            variantString += styles.MOCButtonLight
            break
        default:
            variantString += ' '
            variantString += styles.MOCButtonDark
            break
    }
    // #endregion
    const buttonWrapper = React.useRef<HTMLDivElement>(null)
    const button = React.useRef<HTMLDivElement>(null)
    const buttonHighlight = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        if (buttonWrapper.current) {
            buttonWrapper.current.addEventListener('mousemove', (e) => {
                if (
                    button.current &&
                    buttonWrapper.current &&
                    buttonHighlight.current
                ) {
                    if (e.buttons === 1) {
                        button.current.style.transition =
                            'transform 0.1s ease-in-out, scale 0.1s ease-in-out'
                        button.current.style.scale = `0.9`
                    } else {
                        button.current.style.transition =
                            'transform 0.1s ease-in-out, scale 0.1s ease-in-out'
                        button.current.style.scale = `0.95`
                        button.current.style.transition = 'none'
                        buttonWrapper.current.style.transition = 'none'
                        buttonHighlight.current.style.transition = 'none'
                    }
                    const x = e.offsetX
                    const y = e.offsetY
                    const { width, height } =
                        buttonWrapper.current.getBoundingClientRect()
                    const halfWidth = width / 2
                    const halfHeight = height / 2
                    const rotationY = ((x - halfWidth) / halfWidth) * 15
                    const rotationX = ((y - halfHeight) / halfHeight) * 15 * -1
                    button.current.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`
                    buttonHighlight.current.style.left = `${
                        (rotationY / 2) * 30 * -1
                    }%`
                    buttonHighlight.current.style.top = `${
                        (rotationX / 2) * 30
                    }%`
                }
            })
            buttonWrapper.current.addEventListener('mouseleave', () => {
                if (
                    button.current &&
                    buttonWrapper.current &&
                    buttonHighlight.current
                ) {
                    button.current.style.transition =
                        'transform 0.1s ease-in-out, scale 0.1s ease-in-out'
                    button.current.style.transform = `rotateY(0) rotateX(0)`
                    buttonWrapper.current.style.transition =
                        'transform 0.5s ease-in-out'
                    buttonWrapper.current.style.transform = `rotateY(0) rotateX(0)`
                    buttonHighlight.current.style.transition =
                        'left 0.1s ease-in-out ,top 0.1s ease-in-out'
                    buttonHighlight.current.style.left = `50%`
                    buttonHighlight.current.style.top = `50%`
                    button.current.style.transition =
                        'transform 0.1s ease-in-out, scale 0.1s ease-in-out'
                    button.current.style.scale = `1`
                }
            })
        }
    }, [])

    return (
        <div>
            <div
                ref={buttonWrapper}
                style={{
                    perspective: 1000000,
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <div ref={button} style={{ perspective: 1000000 }}>
                    <div
                        ref={buttonHighlight}
                        style={{
                            height: 300,
                            width: 300,
                            borderRadius: 50000,
                            background: 'rgba(255, 255, 255,0.6)',
                            filter: 'brightness(100%) blur(20px)',
                            transform: 'translate(-50%,-50%)',
                            top: '50%',
                            left: '50%',
                            position: 'absolute',
                            userSelect: 'none'
                        }}
                    />
                    <button className={variantString}>{props.text}</button>
                </div>
            </div>
        </div>
    )
}
