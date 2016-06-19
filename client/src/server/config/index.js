import local from './local.json';
import dev from './dev.json';
import prod from './local.json';

const envs = {
  local,
  dev,
  prod
};

export default envs[process.env.NODE_ENV] || dev;
