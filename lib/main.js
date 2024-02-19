// importing all instances
import * as hello from './form.js';

import { createAdvanceTable, createBasicTable } from './table.js';
import { errorHandling } from './validation.js';

createBasicTable();
createAdvanceTable();

const channel = new BroadcastChannel('my-channel');

channel.addEventListener('message', (e) => {
  console.log(e.data);
});
