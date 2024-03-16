
import "./curent-weather.css";
import { useEffect } from 'react';
import { useFrameworkContext } from "../local-storage/local-storage";

const HeartButton = (props) => {
  const { addFramework, removeFramework } = useFrameworkContext();

  useEffect(() => {
    const handleHeartButtonClick = () => {
      const maCity = localStorage.getItem(props.data1);

      if (maCity === null || maCity === 'null') {
        localStorage.setItem(props.data1, JSON.stringify(props.data2));
        addFramework(props.data1);
        console.log(`adding ${props.data1}`);
      } else {
        localStorage.removeItem(props.data1);
        removeFramework(props.data1);
        console.log(`removing ${props.data1}`);
      }
      
      console.log(localStorage);

    };

    const heartButton = document.getElementById('heartButton');
    if (heartButton) {
      heartButton.addEventListener('click', handleHeartButtonClick);
    }

    return () => {
      if (heartButton) {
        heartButton.removeEventListener('click', handleHeartButtonClick);
      }
    };
  }, [addFramework, removeFramework, props.data]);

  return (
    <div>
      <button id="heartButton" className="heart-shape"></button>
    </div>
  );
};

export default HeartButton;