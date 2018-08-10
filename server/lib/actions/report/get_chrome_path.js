import path from 'path';
import { chmodSync } from 'fs';
import { listAllFilesSync } from '../../helpers';

export default function getChromePath() {
  let chromePath = path.join(__dirname, '../../../../node_modules/puppeteer/.local-chromium');
  chromePath = listAllFilesSync(chromePath).filter((f) => f.split('/').pop() === 'chrome');

  if (chromePath.length !== 1) {
    throw new Error('puppeter chrome was not found');
  }

  chromePath = chromePath[0];

  try {
    chmodSync(chromePath, '755');
  } catch (err) {
    throw new Error('user has no permissions to make file executable: ' + chromePath);
  }

  return chromePath;
}
