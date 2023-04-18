import React from 'react';
import renderer from 'react-test-renderer';
import Intro from './intro';

describe('Intro', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Intro />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
