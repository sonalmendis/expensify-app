// This file is just to setup enzyme to work with React 16 https://airbnb.io/enzyme/

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
	adapter: new Adapter()
});

require('dotenv').config({ path: '.env.test' });
