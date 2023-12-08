import "./about.css"

const homeAbout = [
  {
    id: 1,
    cover: "https://img.icons8.com/ios/80/000000/code.png",
    title: "Web Development",
    desc: "Join our web development courses and become a skilled web developer. Learn the latest technologies and create dynamic websites and web applications.",
  },
  {
    id: 2,
    cover: "https://img.icons8.com/ios/80/000000/design.png",
    title: "Graphic Design",
    desc: "Discover the world of graphic design. Develop your creative skills, design stunning visuals, and work on exciting design projects.",
  },
  {
    id: 3,
    cover: "https://img.icons8.com/dotty/80/000000/storytelling.png",
    title: "Digital Marketing",
    desc: "Excel in digital marketing. Gain expertise in SEO, social media marketing, content strategy, and drive online growth for brands and businesses.",
  },
];

const About = () => {
  return (
    <>
        <section className='aboutHome mb-12 sticky mt-[700px]'>
      <h2 className="text-3xl text-pink-900 text-center">LEARN ANYTHING</h2>
            <h3 className="text-5xl text-pink-400 text-center">Benefits About Online Job Portal</h3>
            
        <div className='container flex flexSB'>
          
          <div className='left row w-full'>
            <img className="mt-36" src='https://i.ibb.co/sWvZrfz/about.jpg'  alt='' />
          </div>
          <div className='right row'>
            <div className='items'>
              {homeAbout.map((val,index) => {
                return (
                  <div key={index} className='item shadow-lg flexSB'>
                    <div className='img'>
                      <img src={val.cover} alt='' />
                    </div>
                    <div className='text'>
                      <h2>{val.title}</h2>
                      <p>{val.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
