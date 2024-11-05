import Image from "next/image"
import A from "../images/intro/a_acolorfulhistory.jpg"

const Intro = () => {
    return (
        <section className="intro-container">
            <Image
                src={A}
                alt="Picture of the author"
            />
        </section>
    )
}

export default Intro