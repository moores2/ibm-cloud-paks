/**
 * Copyright IBM Corp. FULL_YEAR, FULL_YEAR
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from '@testing-library/react'; // https://testing-library.com/docs/react-testing-library/intro
import React from 'react';

import { pkg } from '../../settings';
import '../../enable-all'; // must come before component is imported (directly or indirectly)

const blockClass = `${pkg.prefix}--STYLE_NAME`;

import { DISPLAY_NAME } from '.';
const name = DISPLAY_NAME.displayName;

describe(name, () => {
  test('has no accessibility violations', async () => {
    const { container } = render(<DISPLAY_NAME>{name}</DISPLAY_NAME>);

    await expect(container).toBeAccessible(name);
    await expect(container).toHaveNoAxeViolations();
  });

  test('Renders the component `DISPLAY_NAME` if flag is enabled', () => {
    const { container } = render(<DISPLAY_NAME />);

    expect(container.querySelector(`.${blockClass}`)).not.toBeNull();
  });

  it(`adds content for the ${name}`, () => {
    expect(
      render(<DISPLAY_NAME>{name}</DISPLAY_NAME>).getByText(name)
    ).toBeInTheDocument();
  });

  test('adds a class to the containing node', () => {
    const className = 'className';

    expect(
      render(
        <DISPLAY_NAME className={className}>{name}</DISPLAY_NAME>
      ).container.querySelector(`.${className}`)
    ).toBeInTheDocument();
  });

  test('adds additional props to the containing node', () => {
    const dataTestId = 'dataTestId';

    expect(
      render(
        <DISPLAY_NAME data-testid={dataTestId}>{name}</DISPLAY_NAME>
      ).getByTestId(dataTestId)
    ).toBeInTheDocument();
  });
});
