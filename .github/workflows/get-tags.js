const { exec } = require('@actions/exec');
const core = require('@actions/core');

async function run() {
  try {
    const tagList = [];
    await exec('git', ['fetch', '--tags']);

    await exec('git', ['for-each-ref', '--format', '%(refname:short)', 'refs/tags'], {
      listeners: {
        stdout: (data) => {
          tagList.push(data.toString().trim());
        },
      },
    });

    core.setOutput('tags', tagList.join(', '));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
