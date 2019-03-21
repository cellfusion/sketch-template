#!/usr/bin/env node

const os = require('os');
const fs = require('fs');
const path = require('path');
const cli = require('cac')();
const util = require('util');
const spawn = require('cross-spawn');
const libraries = require('./libraries.js');

const expotJson = (projectPath, json, filename) => {
    fs.writeFileSync(
      path.join(projectPath, filename),
      JSON.stringify(json, null, 2) + os.EOL
    );
}

const install = (projectPath, dependencies, verbose, useYarn, isDev) => {
  return new Promise((resolve, reject) => {
    let command;
    let args;

    if (useYarn) {
      command = 'yarnpkg';
      args = ['add'].concat(dependencies);

      args.push('--cwd');
      args.push(projectPath);
    } else {
      command = 'npm';
      args = [ 'i', '--loglevel', 'error'].concat(dependencies);
    }

    if (isDev) args.push('-D')
    if (verbose) args.push('--verbose');

    const child = spawn(command, args, { stdio: 'inherit', cwd: projectPath });
    child.on('close', code => {
      if (code !== 0) {
        reject({ command: `${command} ${args.join(' ')}`, });
        return;
      }
      resolve();
    });
  });
}


const create = async (appName, library, useTypescript, useNpm, verbose) => {
    // library check
    if (!Object.keys(libraries).includes(library)) {
      console.error('hoge');
      return;
    }

    const projectPath = path.join(process.cwd(), appName);

    // TODO exist error

    fs.mkdirSync(projectPath);

    // package.json
    const packageJson = {
      name: appName,
      version: '0.1.0',
      private: true,
      scripts: {
        start: 'webpack-dev-server',
        build: 'webpack'
      }
    };
    expotJson(projectPath, packageJson, 'package.json');

    if (useTypescript) {
      // tsconfig
      fs.copyFileSync(
        path.join(__dirname, 'template/tsconfig.json'),
        path.join(projectPath, 'tsconfig.json')
      );

      // webpack.config
      fs.copyFileSync(
        path.join(__dirname, 'template/ts-webpack.config.js'),
        path.join(projectPath, 'webpack.config.js')
      );
    } else {
      // babel
      fs.copyFileSync(
        path.join(__dirname, 'template/babel.config.js'),
        path.join(projectPath, 'babel.config.js')
      );

      // webpack.config
      fs.copyFileSync(
        path.join(__dirname, 'template/js-webpack.config.js'),
        path.join(projectPath, 'webpack.config.js')
      );
    }

    // copy html
    fs.mkdirSync(path.join(projectPath, 'public'));
    fs.copyFileSync(
      path.join(__dirname, 'template/index.html'),
      path.join(projectPath, 'public/index.html')
    );

    // copy main file
    const ext = useTypescript ? 'ts' : 'js';
    fs.mkdirSync(path.join(projectPath, 'src'));
    fs.copyFileSync(
      path.join(__dirname, `template/${library}.${ext}`),
      path.join(projectPath, `src/main.${ext}`)
    );
    
    const devDependencies = ['html-webpack-plugin', 'webpack', 'webpack-cli', 'webpack-dev-server'];
    if (useTypescript) {
      devDependencies.push('ts-loader', 'typescript');
    } else {
      devDependencies.push(
    '@babel/core',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-async-to-generator',
    '@babel/polyfill',
    '@babel/preset-env',
    'babel-loader',
    'babel-plugin-module-resolver',
      )
    }

    const lang = useTypescript ? 'typescript': 'javascript';
    const dependencies = libraries[library].dependencies[lang];

    // module install
    await install(projectPath, devDependencies, verbose, !useNpm, true);
    await install(projectPath, dependencies, verbose, !useNpm, false);
  }

// cli
cli.command('create <appName> <library>')
  .option('--typescript', 'use typescript')
  .option('--use-npm', 'use npm')
  .option('--verbose', '')
  .action((appName, library, options) => {
    const useTypescript = options.typescript !== undefined ? options.typescript : false;
    const useNpm = options.useNpm !== undefined ? options.useNpm : false
    const verbose = options.verbose !== undefined ? options.verbose : false
    create(appName, library, useTypescript, useNpm, verbose);
  });
cli.help();
cli.parse();

