module.exports = {
  typescript: 'true',
  prettier: false,
  expandProps: 'start',
  svgoConfig: {
    multipass: true,
    plugins: [
      {
        name: 'cleanupAttrs',
        active: true,
      },
      {
        name: 'cleanupEnableBackground',
        active: true,
      },
      {
        name: 'cleanupIds',
        active: true,
      },
      {
        name: 'cleanupListOfValues',
        active: true,
      },
      {
        name: 'cleanupNumericValues',
        active: true,
        params: { floatPrecision: 2 },
      },
      {
        name: 'collapseGroups',
        active: true,
      },
      {
        name: 'convertColors',
        active: true,
      },
      {
        name: 'convertPathData',
        active: true,
      },
      {
        name: 'convertShapeToPath',
        active: true,
      },
      {
        name: 'convertStyleToAttrs',
        active: true,
      },
      {
        name: 'convertTransform',
        active: true,
      },
      {
        name: 'mergePaths',
        active: true,
      },
      {
        name: 'minifyStyles',
        active: true,
      },
      {
        name: 'moveElemsAttrsToGroup',
        active: true,
      },
      {
        name: 'moveGroupAttrsToElems',
        active: true,
      },
      // {
      //   name: 'removeAttrs',
      //   active: true,
      // },
      {
        name: 'removeComments',
        active: true,
      },
      {
        name: 'removeDesc',
        active: true,
      },
      {
        name: 'removeDimensions',
        active: false,
      },
      {
        name: 'removeDoctype',
        active: true,
      },
      {
        name: 'removeEditorsNSData',
        active: true,
      },
      {
        name: 'removeElementsByAttr',
        active: true,
      },
      {
        name: 'removeEmptyAttrs',
        active: true,
      },
      {
        name: 'removeEmptyContainers',
        active: true,
      },
      {
        name: 'removeEmptyText',
        active: true,
      },
      {
        name: 'removeHiddenElems',
        active: true,
      },
      {
        name: 'removeMetadata',
        active: true,
      },
      {
        name: 'removeNonInheritableGroupAttrs',
        active: true,
      },
      {
        name: 'removeStyleElement',
        active: true,
      },
      {
        name: 'removeTitle',
        active: true,
      },
      {
        name: 'removeUnknownsAndDefaults',
        active: true,
      },
      {
        name: 'removeUnusedNS',
        active: true,
      },
      {
        name: 'removeUselessDefs',
        active: true,
      },
      {
        name: 'removeUselessStrokeAndFill',
        active: true,
      },
      {
        name: 'removeViewBox',
        active: false,
      },
      {
        name: 'removeXMLNS',
        active: false,
      },
      {
        name: 'removeXMLProcInst',
        active: true,
      },
      {
        name: 'sortAttrs',
        active: true,
      },
    ],
    js2svg: {
      pretty: true,
      indent: '  ',
    },
    prettierConfig: {
      parser: 'typescript',
    },
  },
};
