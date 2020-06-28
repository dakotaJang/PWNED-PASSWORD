import { prompt } from 'inquirer';
import { sha1 } from './sha1';
import { requestPasswordRange } from './requestPasswordRange';

const main = async () => {
  const inputs = await prompt({
    name: 'password',
    mask: '*',
    message: 'Input your password',
    type: 'password',
  }).catch(() => {
    console.log('something went wrong');
    process.exit();
  });

  const hashedPassword = sha1(inputs.password);

  // first five characters of the hashed password
  const query = hashedPassword.slice(0,5);

  const matchedHashedPasswords = await requestPasswordRange(query);

  const result = matchedHashedPasswords.filter(password => password.hash === hashedPassword.slice(5));

  if (result.length === 1) {
    console.log(`\nYour password has been pwned.\nThis password has appeared ${result[0].count} times in the data set.\nDo not use this password.\n`);
  } else if (result.length > 1) {
    console.log('Multiple results found.\n');
    console.log(`This password has appeared ${result.map(r => r.count).join(' or ')} times in the data set.\nDo not use this password.\n`);
  } else {
    console.log('This password has not been found in the data set.\n');
  }
}

main().then(() => process.exit());
