import React, { useContext } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
// Import the default styles for react-horizontal-scrolling-menu
import 'react-horizontal-scrolling-menu/dist/styles.css';

const LeftArrow = () => {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);
  return (
    <button
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
      className="text-2xl text-gray-600 hover:text-gray-800"
    >
      <FaArrowAltCircleLeft />
    </button>
  );
};

const RightArrow = () => {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);
  return (
    <button
      disabled={isLastItemVisible}
      onClick={() => scrollNext()}
      className="text-2xl text-gray-600 hover:text-gray-800"
    >
      <FaArrowAltCircleRight />
    </button>
  );
};

// A Card component that accepts an itemId prop but doesn't pass it to the DOM.
const Card = ({ itemId, children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export default function ImageScrollbar({ data }) {
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {data.map((item) => (
        <Card
          key={item.id}
          itemId={item.id} // This prop is used by ScrollMenu internally
          className="m-2"
          style={{ width: '400px', height: '300px', position: 'relative' }}
        >
          <img
            src={item.url}
            alt="property"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </Card>
      ))}
    </ScrollMenu>
  );
}

