module.exports = {
  apps: [
    {
      name: 'next',
      exec_mode: 'cluster',
      instances: 1,
      args: 'start',
      cwd: '/usr/app/',
      script: './node_modules/next/dist/bin/next',
      watch: false,
      autorestart: true,
      combine_logs: true,
      exp_backoff_restart_delay: 100,
      ignore_watch: ['node_modules'],
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: './pm2/logs/next_err.log'
    }
  ]
}
