// index.js - Auction frontend entry point
import React from 'react';
import { createRoot } from 'react-dom/client';

import AuctionApp from './modules/AuctionApp';
import { UserProvider } from './modules/UserContext';

const root = createRoot(document.getElementById('root'));
root.render(
	<UserProvider>
		<AuctionApp />
	</UserProvider>
);
