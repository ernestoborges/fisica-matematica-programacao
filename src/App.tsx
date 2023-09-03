import { useState } from 'react'
import { Canvas } from './components/Canvas/Canvas'
import styled from 'styled-components'

export function App() {

  let [width, setWidth] = useState(600)
  let [height, setHeigth] = useState(400)

  let [intervalX, setIntervalX] = useState(10);
  let [intervalY, setIntervalY] = useState(10);

  let [originX, setOriginX] = useState(300);
  let [originY, setOriginY] = useState(200);

  let [launcherX, setLauncherX] = useState(0);
  let [launcherY, setLauncherY] = useState(0);

  let [launcherAngle, setLauncherAngle] = useState(45);
  let [projectileSpeed, setProjectileSpeed] = useState(40);
  let [gravityAcceleration, setGravityAcceleration] = useState(9.8);
  return (
    <>
      <AppContainer>
        <CanvasContainer>
          <ValuesContainer>

            <div>
              <p><span>Launcher position (m):</span> X = {launcherX}; Y = {-launcherY}</p>
              <p><span>Launcher Angle (Degree):</span> {launcherAngle}º </p>
              <p><span>Projectile Speed (m/s):</span> {projectileSpeed} m/s</p>
              <p><span>Gravity Acceleration (m/s²):</span> {gravityAcceleration} m/s²</p>
            </div>
            <div>
              <p>Oblique Throw Equation:</p>
              <p> y ( t ) = ( y0 ) + ( v0 * sen( α ) * t ) - ( g * ( t² / 2 ) ) </p>
              <p className='example'> y ( t ) = ( <span>{-launcherY}</span> ) + ( <span>{projectileSpeed}</span> * sen( <span>{(launcherAngle * (Math.PI / 180)).toFixed(2)}</span> ) * t ) - ( <span>{gravityAcceleration}</span> * ( t² / 2 ) ) </p>
              <br />
              <p> x ( t ) = ( x0 ) + ( v0 * cos( α ) * t ) </p>
              <p className='example'> x ( t ) = ( <span>{launcherX}</span> ) + ( <span>{projectileSpeed}</span> * cos( <span>{(launcherAngle * (Math.PI / 180)).toFixed(2)}</span> ) * t ) </p>
              <br />
            </div>
          </ValuesContainer>

          <Canvas
            width={width}
            height={height}
            intervalX={intervalX * 2}
            intervalY={intervalY * 2}
            originX={originX}
            originY={originY}
            launcherX={launcherX}
            launcherY={launcherY}
            launcherAngle={launcherAngle}
            projectileSpeed={projectileSpeed}
            gravityAcceleration={gravityAcceleration}
          />
        </CanvasContainer>
        <OptionsContainer>
          <p>Width: {width}</p>
          <input type='range' min={100} max={600} onChange={(e) => setWidth(Number(e.target.value))} value={width} />
          <p>Heigth: {height}</p>
          <input type='range' min={100} max={400} onChange={(e) => setHeigth(Number(e.target.value))} value={height} />

          <p>X interval: {intervalX}</p>
          <input type='number' min={10} max={300} onChange={(e) => setIntervalX(Number(e.target.value) < 10 ? 10 : Number(e.target.value))} value={intervalX} />
          <p>Y interval: {intervalY}</p>
          <input type='number' min={10} max={200} onChange={(e) => setIntervalY(Number(e.target.value) < 10 ? 10 : Number(e.target.value))} value={intervalY} />

          <p>X Origin: {originX}</p>
          <input type='range' min={0} max={width} onChange={(e) => setOriginX(Number(e.target.value))} value={originX} />
          <p>Y Origin: {originY}</p>
          <input type='range' min={0} max={height} onChange={(e) => setOriginY(Number(e.target.value))} value={originY} />


          <hr></hr>
          <p>Launcher</p>
          <p>Position X: {launcherX}</p>
          <input type='range' min={-300} max={300} onChange={(e) => setLauncherX(Number(e.target.value))} value={launcherX} />
          <p>Position Y: {launcherY}</p>
          <input type='range' min={-300} max={300} onChange={(e) => setLauncherY(Number(e.target.value))} value={launcherY} />
          <p>Angle: {launcherAngle}</p>
          <input type='range' min={0} max={360} onChange={e => setLauncherAngle(Number(e.target.value))} value={launcherAngle} />

          <p>Speed: {projectileSpeed}</p>
          <input type='range' min={0} max={300} onChange={e => setProjectileSpeed(Number(e.target.value))} value={projectileSpeed} />

          <p>Gravity Acceleration: {gravityAcceleration}</p>
          <input type='range' min={0} max={274} onChange={e => setGravityAcceleration(Number(e.target.value))} value={gravityAcceleration} />

        </OptionsContainer>
      </AppContainer>
    </>
  )
}

const AppContainer = styled.div`
  width: 100%;
  min-height: 50rem;
  display: flex;
  gap: 10rem;
`
const CanvasContainer = styled.section`
  width: 62rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const OptionsContainer = styled.section`

`
const ValuesContainer = styled.div`
  display: flex;
  
  & > div {
    width: 100%;

    &:first-child{
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      & span {
        color: gray;
      }
    }

    &:nth-child(2){

      & .example {
        color: gray;

        & span {
          color: white;
      }

    }
  }
`