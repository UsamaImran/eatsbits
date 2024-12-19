import { motion, MotionProps } from 'framer-motion';
import React from 'react';

interface Props extends MotionProps {
  children: React.ReactNode;
}

function AnimationContainer({ children, ...rest }: Props) {
  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0, x: 12, ...Object(rest.initial) }}
      animate={{ opacity: 1, x: 0, scale: 1, ...Object(rest.animate) }}
      exit={{ opacity: 0.2, ...Object(rest.exit) }}
      transition={{ duration: 1, ...Object(rest.transition) }}
      style={{ width: '100%', ...rest.style }}
    >
      {children}
    </motion.div>
  );
}

export default AnimationContainer;
