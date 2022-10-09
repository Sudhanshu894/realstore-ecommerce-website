import React from 'react'
import styled from 'styled-components'

const SliderStyles = styled.div`
    width: 100vw;
    height: 25vh;
    margin: 2rem 0;

    .slider{
        height: 100%;
        width: 1230px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(2, calc(250px*12));
        place-items: center;
        position: relative;
        overflow: hidden;

        .slide-wrapper{
            display: flex;
            animation: slide 30s linear infinite;

                .slide{
                height: 100%;
                width: 250px;
                display: grid;
                place-items: center;
                padding: 1.5rem;
                perspective: 100px;

                img{
                    width: 65%;
                    height: 85%;
                    transition: transform 1s;
                }
            }
        }

    }

    @keyframes slide{
        0%{
            transform: translateX(0);
        }
        100%{
            transform: translateX(calc(-300px*6));
        }
    }

    @media (min-width: 781px) and (max-width: 1200px){
        .slider{
            width: 80%;
            grid-template-columns: repeat(2, calc(200px*12));

            .slide-wrapper{
                .slide{
                    width: 200px;
                }
            }
        }
    }
    @media (max-width: 780px){
        height: 18vh;
        .slider{
            width: 80%;
            grid-template-columns: repeat(2, calc(170px*12));

            .slide-wrapper{
                .slide{
                    width: 170px;
                }
            }

        }
    }
    @media (max-width: 550px){
        .slider{
            width: 90%;
        }
    }
`

function PreFooter() {

    let data = ['http://roythemes.com/demo/modez/_ori/img/m/6-brand_default.jpg',
        'http://roythemes.com/demo/modez/_ori/img/m/5-brand_default.jpg',
        'http://roythemes.com/demo/modez/_ori/img/m/4-brand_default.jpg',
        'http://roythemes.com/demo/modez/_ori/img/m/3-brand_default.jpg',
        'http://roythemes.com/demo/modez/_ori/img/m/2-brand_default.jpg',
        'http://roythemes.com/demo/modez/_ori/img/m/1-brand_default.jpg']

    data = [...data, ...data]

    return (
        <SliderStyles>
            <div className='slider'>
                <div className="slide-wrapper">
                    {data.map((el) => {
                        return <div className='slide'>
                            <img src={el} alt='' />
                        </div>
                    })}
                </div>
            </div>
        </SliderStyles>
    )
}

export default PreFooter