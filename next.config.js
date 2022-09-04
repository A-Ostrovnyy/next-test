module.exports = {
  images: {
    domains: ['courses-top.ru', 'localhost:8001']
  },
  webpack(config) {
    // Allow import svg files as components
    config.module.rules.push({
      test: /\.svg$/,
      // issuer: {
      //   test: /\.(js|ts)x?$/
      // },
      use: ['@svgr/webpack'],
    });
    return config;
  }
}
