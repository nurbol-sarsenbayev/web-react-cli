import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';

describe('Smoke test', () => {
    it('should render div without crashing', () => {
        const div = shallow(<div/>);
        expect(div.exists()).eq(true)
    });
});
