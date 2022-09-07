import React, { useEffect, useRef, useState } from "react"

export default function Signature({type, data}: {type: string, data: any}){

    const [ctx, setCtx] = useState<any>(null)
    const canvasElement = useRef<HTMLCanvasElement>(null);
    const [drawPen, setDrawPen] = useState(false)
    const setPen = () => {
        setDrawPen(false)
    }

    const disPen = () => {
        setDrawPen(true)
    }

    const drawSign = (event: any) => {
        if(type == "draw"){
            const rect = canvasElement.current?.getBoundingClientRect();
            if(drawPen && rect){
                draw( event.clientX- rect.left , event.clientY - rect.top )
            }
        }
        
    }

    const draw = (x: number, y: number ) => {
        
        ctx.fillStyle = "#000000"
        ctx.beginPath()
        ctx.arc( x, y, 2, 0, Math.PI*2, true)
        ctx.closePath()
        ctx.fill()
    }
    
    const drawText = (text: string) => {
        clear()
        ctx.font = "30px Arial";
        ctx.fillText(text, 20, 60);
    }

    const drawImage = (ImageData: any) => {
        clear()
        ImageData.onload = function(){
            ctx.drawImage(ImageData,0,0); // Or at whatever offset you like
        };       
    }

    const clear = () => {
        ctx.clearRect(0, 0, canvasElement.current?.width, canvasElement.current?.height)
    }

    useEffect(()=>{
        if(type == "type" && typeof data != "object"){
            drawText(data)
        }
        if(type == "upload" && typeof data == "object"){
            drawImage(data)
        }
    }, [data])
    
    useEffect(()=>{
        if(ctx)
            clear()
    }, [type])
    

    useEffect(() => {
        setCtx(canvasElement.current?.getContext('2d'));
    }, []);
    return (
        <canvas ref={canvasElement as React.RefObject<HTMLCanvasElement>} onMouseDown={disPen} onMouseUp={setPen} onMouseMove={drawSign} height={100} width={350} style={{border: "1px solid lightgrey", backgroundColor: "lightgrey", height: "100px", width: "350px", margin : "10px auto"}} />
    );
}