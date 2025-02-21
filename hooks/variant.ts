export const useListVariant = (stagger?: number) => {
  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: stagger || 0.15
      }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1 }
  };

  return {
    container,
    child
  };
};

export const useOrderInfoVariant = (stagger?: number) => {
  const container = {
    hidden: { opacity: 0, scale: 0.7 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: stagger || 0.15,
        delayChildren: 0.3
      }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1 }
  };

  return {
    container,
    child
  };
};
