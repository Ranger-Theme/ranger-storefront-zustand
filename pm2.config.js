module.exports = {
  apps: [
    {
      name: 'next',
      exec_mode: 'cluster',
      instances: 1,
      args: 'start',
      script: './node_modules/next/dist/bin/next',
      watch: false,
      autorestart: true,
      combine_logs: true,
      env: {
        PORT: 3000,
        NODE_ENV: 'production'
      },
      exp_backoff_restart_delay: 100,
      ignore_watch: ['node_modules'],
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: './pm2/logs/next_err.log'
    }
  ]
}
