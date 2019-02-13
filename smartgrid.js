const smartgrid = require('smart-grid');

const settings = {
	columns: 12,
    offset: "20px",
	outputStyle: 'scss',
};

smartgrid('./src/buildCSS', settings);