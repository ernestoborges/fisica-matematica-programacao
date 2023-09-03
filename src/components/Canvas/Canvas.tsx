import { useEffect, useRef } from "react"
import styled from "styled-components"

interface ICanvas {
    width: number
    height: number
    intervalX: number
    intervalY: number
    originX: number
    originY: number
    launcherX: number
    launcherY: number
    launcherAngle: number
    projectileSpeed: number
    gravityAcceleration: number
}

export function Canvas({
    width,
    height,
    intervalX,
    intervalY,
    originX,
    originY,
    launcherX,
    launcherY,
    launcherAngle,
    projectileSpeed,
    gravityAcceleration 
}: ICanvas) {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');

            if (ctx) {
                const originXInCanvas = width - originX;
                const originYInCanvas = height - originY;

                ctx.clearRect(0, 0, width, height);
                drawSupportAxis(ctx, width, height, intervalX, intervalY, originXInCanvas, originYInCanvas);
                drawLauncher(ctx, launcherX, launcherY, launcherAngle, projectileSpeed, gravityAcceleration, originXInCanvas, originYInCanvas)
            }
        }
    }, [width, height, intervalX, intervalY, originX, originY, launcherX, launcherY, launcherAngle, projectileSpeed, gravityAcceleration])

    function drawSupportAxis(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        intervalX: number,
        intervalY: number,
        originXInCanvas: number,
        originYInCanvas: number
    ) {

        if (intervalX <= 0 || intervalY <= 0 || originX < 0 || originY < 0) {
            return;
        }

        const numIntervalsX = Math.floor(width / intervalX);
        const numIntervalsY = Math.floor(height / intervalY);

        let startX = originXInCanvas % intervalX;
        let startY = originYInCanvas % intervalY;

        ctx.font = "8px Arial";
        ctx.fillStyle = "gray"
        ctx.strokeStyle = "white"
        ctx.lineWidth = 2;

        ctx.lineWidth = 1;
        for (let i = 0; i <= numIntervalsY; i++) {

            const posY = startY + i * intervalY;
            ctx.strokeStyle = "gray"

            if ((posY - originYInCanvas) / 2 === 0) {
                ctx.strokeStyle = "white"
            }

            ctx.beginPath();
            ctx.moveTo(0, posY);
            ctx.lineTo(width, posY);
            ctx.stroke();
            ctx.fillText(((posY - originYInCanvas) / 2).toString(), originXInCanvas + 5, posY + 15);

            ctx.beginPath();
            ctx.moveTo(originXInCanvas - 5, posY);
            ctx.lineTo(originXInCanvas + 5, posY);
            ctx.strokeStyle = "white"
            ctx.stroke();
        }

        // Desenhar as linhas de grade no eixo X
        for (let i = 0; i <= numIntervalsX; i++) {
            const posX = startX + i * intervalX;
            ctx.strokeStyle = "gray"

            if ((posX - originXInCanvas) / 2 === 0) {
                ctx.strokeStyle = "white"
            }

            ctx.beginPath();
            ctx.moveTo(posX, 0);
            ctx.lineTo(posX, height);
            ctx.stroke();
            ctx.fillText(((posX - originXInCanvas) / 2).toString(), posX + 5, originYInCanvas + 15);

            ctx.beginPath();
            ctx.moveTo(posX, originYInCanvas - 5);
            ctx.lineTo(posX, originYInCanvas + 5);
            ctx.strokeStyle = "white"
            ctx.stroke();
        }

        ctx.font = "12px Arial";
        ctx.fillStyle = "white"
        ctx.fillText("+ x", width - 20, originYInCanvas - 10);
        ctx.fillText("- y", originXInCanvas - 20, height - 10);
        ctx.fillText("- x", 5, originYInCanvas - 10);
        ctx.fillText("+ y", originXInCanvas - 22, 15);
    }

    function drawLauncher(
        ctx: CanvasRenderingContext2D,
        launcherX: number,
        launcherY: number,
        launcherAngle: number,
        projectileSpeed: number,
        gravityAcceleration: number,
        originXInCanvas: number,
        originYInCanvas: number
    ) {

        let X0 = originXInCanvas + launcherX
        let Y0 = originYInCanvas + launcherY

        let RAD = -launcherAngle * (Math.PI / 180);

        const X1 = X0 + 10 * Math.cos(RAD);
        const Y1 = Y0 + 10 * Math.sin(RAD);

        ctx.strokeStyle = "red"
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(X0, Y0);
        ctx.lineTo(X1, Y1);
        ctx.stroke();

        // // draw parabolic
        let C = { x: X1, y: Y1 }
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 1;

        for (let t = 0; t <= 100; t += 0.1) { 
            const x = C.x + (projectileSpeed * Math.cos(-RAD) * t);
            const y = C.y - (projectileSpeed * Math.sin(-RAD) * t - (0.5 * gravityAcceleration * t * t));
          
        
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = 'blue';
            ctx.fill();
          }
    }



    return <>
        <CanvasContainer>
            <CanvasElement ref={canvasRef} width={width} height={height} />
        </CanvasContainer>
    </>
}

const CanvasContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;  
`

const CanvasElement = styled.canvas`
    border: 1px solid white;
`