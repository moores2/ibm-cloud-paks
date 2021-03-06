import React from 'react';

/**
 * unwrapIfFragment - walks the passed children unwrapping fragments
 * to create a flat array of all children
 */
const unwrapIfFragment = (children) => {
  const newChildArray = [];

  const isFragment = (item) => item && item.type === React.Fragment;

  const addChildren = (children) => {
    const loopOver = (children) => {
      for (let child of children) {
        addChildren(child);
      }
    };

    // children is nothing, one fragment, array with one or more children, or a single item
    if (!children) return;

    if (isFragment(children)) {
      loopOver(children.props.children);
    } else {
      if (Array.isArray(children)) {
        loopOver(children);
      } else {
        newChildArray.push(children);
      }
    }
  };

  // nothing, one fragment, array with one or more children, or a single item
  addChildren(children);

  return newChildArray;
};

export default unwrapIfFragment;
