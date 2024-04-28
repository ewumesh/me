// import styled, { keyframes, css } from "styled-components";
"use client";
import styled, { css, keyframes } from "styled-components";



export const MQ = () => {
    const row1 = [
        "/partners/om.png",
        "/partners/ro.png",
        "/partners/h.png",
        "/partners/g.png",
        "/partners/l.png",
        "/partners/allpasal.png",
      ];
    
      const row2 = [
        "/partners/ii.png",
        "/partners/aff.png",
        "/partners/nn.png",
        "/partners/khumbu.png",
        "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/f50ae7cbf6cc805bdadc.png",
        "/partners/o.png",
      ];
    return (
        <AppContainer className="px-32">
        <Wrapper>
          <Text>With Great Outcomes.</Text>
          <Note>Our customers have gotten offers from awesome companies.</Note>
          <Marquee>
            <MarqueeGroup>
              {row1.map((el, index) => (
                <ImageGroup key={index}>
                  <Image src={el} alt="" />
                </ImageGroup>
              ))}
            </MarqueeGroup>
            <MarqueeGroup>
              {row1.map((el, index) => (
                <ImageGroup key={index}>
                  <Image src={el} alt="" />
                </ImageGroup>
              ))}
            </MarqueeGroup>
          </Marquee>
          <Marquee>
            <MarqueeGroup2>
              {row2.map((el, index) => (
                <ImageGroup key={index}>
                  <Image src={el} alt="" />
                </ImageGroup>
              ))}
            </MarqueeGroup2>
            <MarqueeGroup2>
              {row2.map((el, index) => (
                <ImageGroup key={index}>
                  <Image src={el} alt="" />
                </ImageGroup>
              ))}
            </MarqueeGroup2>
          </Marquee>
        </Wrapper>
      </AppContainer>
        
      )}

      const scrollX = keyframes`
 from {
    transform: translateX(0);
 }
 to {
    transform: translateX(-100%);
 }
`;

const common = css`
 flex-shrink: 0;
 display: flex;
 align-items: center;
 justify-content: space-around;
 white-space: nowrap;
 width: 100%;
 animation: ${scrollX} 30s linear infinite;
`;

const AppContainer = styled.div`
 width: 100%;
 height: 100vh;
 color: #000000;
 position: relative;
 display: flex;
 align-items: center;
 justify-content: center;

 @media (max-width: 768px) {
    height: auto;
    padding: 20px;
 }
`;

const Wrapper = styled.div`
 width: 100%;
 height: fit-content;
 display: flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;

 @media (max-width: 768px) {
    padding: 0 20px;
 }
`;

const Text = styled.div`
 font-size: 35px;
 font-weight: 500;
 margin-bottom: 10px;
 color: #fff;

 @media (max-width: 768px) {
    font-size: 24px;
 }
`;

const Note = styled.div`
 font-size: 18px;
 font-weight: 200;
 margin-bottom: 40px;
 color: #7c8e9a;

 @media (max-width: 768px) {
    font-size: 14px;
 }
`;

const Marquee = styled.div`
 display: flex;
 width: 100%;
 overflow: hidden;
 user-select: none;
 mask-image: linear-gradient(
    to right,
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 10%,
    hsl(0 0% 0% / 1) 90%,
    hsl(0 0% 0% / 0)
 );
`;

const MarqueeGroup = styled.div`
 ${common}
`;

const MarqueeGroup2 = styled.div`
 ${common}
 animation-direction: reverse;
 animation-delay: -3s;
`;

const ImageGroup = styled.div`
 display: grid;
 place-items: center;
 width: clamp(10rem, 1rem + 40vmin, 30rem);
 padding: calc(clamp(10rem, 1rem + 30vmin, 30rem) / 10);

 @media (max-width: 768px) {
    width: clamp(5rem, 1rem + 20vmin, 20rem);
    padding: calc(clamp(5rem, 1rem + 20vmin, 20rem) / 10);
 }
`;

const Image = styled.img`
 object-fit: contain;
 width: 100%;
 height: 100%;
 border-radius: 0.5rem;
 aspect-ratio: 16/9;
 padding: 5px 20px;
 box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

 @media (max-width: 768px) {
    padding: 5px 10px;
 }
`;