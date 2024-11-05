import { useState, useEffect, Fragment } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <Fragment>
      {time.toLocaleTimeString()}
    </Fragment>
  );
};

export default Clock;