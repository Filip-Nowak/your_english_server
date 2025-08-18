import Carousel from "./Carousel";
import Example from "./Example";
import styles from "./aboutUs.module.scss";
function ExampleBox({ examples }) {
  return (
    <div className={styles.exampleContainer}>
      <Carousel>
        {examples.map((example, index) => (
          <Example text={example.text} img={example.image} index={index} />
        ))}
      </Carousel>
    </div>
  );
}

export default ExampleBox;
