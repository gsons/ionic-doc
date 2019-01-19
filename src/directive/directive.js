app.directive("svgOrder", function () {
  return {
    restrict: 'AE',
    template: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="图层_1" x="0px" y="0px" width="60px" height="60px" viewBox="0 0 200 200" enable-background="new 0 0 60 60" xml:space="preserve"><g><path fill="#AF7749" d="M182.408,95.891c0,45.563-36.938,82.499-82.5,82.499c-45.564,0-82.5-36.937-82.5-82.499   c0-45.564,36.936-82.501,82.5-82.501C145.471,13.39,182.408,50.326,182.408,95.891z M99.908,18.39   c-42.803,0-77.5,34.697-77.5,77.501c0,42.801,34.697,77.499,77.5,77.499c42.801,0,77.5-34.698,77.5-77.499   C177.408,53.087,142.709,18.39,99.908,18.39z"/><g><image stroke="null" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAABcCAYAAAABM8khAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpFM0VGNjY4QTYxNTJFNzExQjg0QzgwMjEwRTU1ODk1OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDMEREQjBBRDUyNjExMUU3OURCNTkwQzc0NzY5MjUyMyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDMEREQjBBQzUyNjExMUU3OURCNTkwQzc0NzY5MjUyMyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUzRUY2NjhBNjE1MkU3MTFCODRDODAyMTBFNTU4OTU4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUzRUY2NjhBNjE1MkU3MTFCODRDODAyMTBFNTU4OTU4Ii8+IDwvcmRmOkRlc2NyaXB0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" id="svg_1" height="170" width="165" y="12" x="18"/></g></g></svg>'
  };
});

app.directive("svgPaiban", function () {
  return {
    restrict: 'AE',
    template: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="图层_1" x="0px" y="0px" width="60px" height="60px" viewBox="0 0 200 200" enable-background="new 0 0 60 60" xml:space="preserve"><g><path fill="#AF7749" d="M181.665,95.891c0,45.563-36.936,82.499-82.5,82.499c-45.563,0-82.5-36.937-82.5-82.499   c0-45.564,36.938-82.501,82.5-82.501C144.729,13.39,181.665,50.326,181.665,95.891z M99.165,18.39   c-42.803,0-77.5,34.697-77.5,77.501c0,42.801,34.697,77.499,77.5,77.499s77.5-34.698,77.5-77.499   C176.665,53.087,141.968,18.39,99.165,18.39z"/><g><path stroke="#ae7649" fill="#fff" stroke-width="2" d="m76.77312,92.04086c1.70636,-1.3926 2.23139,-2.28386 2.23139,-2.28386l0.13127,0c0,0 -0.06563,1.22549 -0.06563,2.45098l0,25.38708l-10.23272,0l0,4.7859l26.63463,0l0,-4.7859l-10.10148,0l0,-34.51788l-5.76992,0l-11.08591,9.13081l3.9323,3.45365l4.32608,-3.62076l0,-0.00001zm24.09149,27.33673c0,0.95161 0.13127,1.94963 0.32815,3.00338l29.845,0l0,-4.7859l-22.95391,0c0.12579,-8.9637 22.23199,-10.96439 22.23199,-23.88772c0,-6.79124 -6.0926,-11.3079 -14.62444,-11.3079c-10.42962,0 -14.6299,7.45969 -14.6299,7.45969l4.78549,2.72485c0,0 3.28147,-5.01336 9.38501,-5.01336c4.85112,0 8.324,2.61345 8.324,6.51272c0,9.26543 -22.6914,11.27077 -22.6914,25.29424l0.00001,0zm-22.76797,-81.71307l-10.93824,0l0,15.48106l10.93824,0l0,-15.48106zm60.16036,5.41256l0,14.71513l-21.8765,0l0,-14.71513l-32.81474,0l0,14.70584l-21.86556,0l0,-14.70584l-13.22981,0l0,100.58743l103,0l0,-100.58743l-13.2134,0zm7.74974,95.94079l-92.06175,0l0,-69.24003l92.06175,0l0,69.24003zm-13.21887,-101.35336l-10.93824,0l0,15.48106l10.93824,0l0,-15.48106z" id="svg_1"/></g></g></svg>'
  };
});


app.directive("svgKaifang", function () {
  return {
    restrict: 'AE',
    template: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="图层_1" x="0px" y="0px" width="60px" height="60px" viewBox="0 0 200 200" enable-background="new 0 0 60 60" xml:space="preserve"><g><path fill="#AF7749" d="M181.665,95.891c0,45.563-36.936,82.499-82.5,82.499c-45.563,0-82.5-36.937-82.5-82.499   c0-45.564,36.938-82.501,82.5-82.501C144.729,13.39,181.665,50.326,181.665,95.891z M99.165,18.39   c-42.803,0-77.5,34.697-77.5,77.501c0,42.801,34.697,77.499,77.5,77.499s77.5-34.698,77.5-77.499   C176.665,53.087,141.968,18.39,99.165,18.39z"/><g><path fill="#AF7749" d="M107.696,160.622c-4.326,4.325-11.338,4.325-15.664,0L34.851,103.44c-4.324-4.325-4.324-11.338,0-15.662    l57.182-57.183c4.326-4.324,11.338-4.324,15.664,0l57.182,57.183c4.324,4.324,4.324,11.337,0,15.662L107.696,160.622z     M162.304,103.13c4.154-4.154,4.154-10.889,0-15.042l-54.918-54.92c-4.154-4.153-10.889-4.153-15.043,0l-54.92,54.92    c-4.152,4.153-4.152,10.888,0,15.042l54.92,54.92c4.154,4.153,10.889,4.153,15.043,0L162.304,103.13z"/><path fill="#AF7749" d="M57.337,73.225c0.211,0.212,0.277,0.489,0.146,0.619l-15.32,15.32c-0.131,0.13-0.408,0.064-0.619-0.146    l0,0c-0.209-0.211-0.275-0.488-0.145-0.618l15.32-15.32C56.851,72.95,57.126,73.016,57.337,73.225L57.337,73.225z"/><path fill="#AF7749" d="M90.058,40.503c0.211,0.212,0.277,0.489,0.148,0.619l-15.322,15.32c-0.129,0.13-0.406,0.064-0.617-0.146    l0,0c-0.211-0.211-0.275-0.488-0.146-0.618l15.322-15.32C89.571,40.229,89.849,40.294,90.058,40.503L90.058,40.503z"/><path fill="#AF7749" d="M122.37,138.258c0.211,0.212,0.277,0.489,0.146,0.619l-15.32,15.32c-0.131,0.13-0.408,0.064-0.619-0.146    l0,0c-0.209-0.211-0.275-0.488-0.145-0.618l15.32-15.32C121.884,137.983,122.159,138.049,122.37,138.258L122.37,138.258z"/><path fill="#AF7749" d="M155.091,105.536c0.211,0.212,0.277,0.489,0.148,0.619l-15.322,15.32c-0.129,0.13-0.406,0.064-0.617-0.146    l0,0c-0.211-0.211-0.275-0.488-0.146-0.618l15.322-15.32C154.604,105.262,154.882,105.327,155.091,105.536L155.091,105.536z"/><path fill="#AF7749" d="M141.938,73.227c0.213-0.211,0.49-0.277,0.619-0.146l15.32,15.32c0.131,0.13,0.064,0.407-0.145,0.618l0,0    c-0.211,0.21-0.488,0.275-0.619,0.146l-15.32-15.32C141.665,73.713,141.729,73.437,141.938,73.227L141.938,73.227z"/><path fill="#AF7749" d="M109.218,40.505c0.211-0.211,0.488-0.276,0.619-0.147l15.32,15.321c0.129,0.13,0.064,0.407-0.146,0.618    l0,0c-0.211,0.21-0.488,0.275-0.617,0.146l-15.32-15.321C108.942,40.991,109.009,40.715,109.218,40.505L109.218,40.505z"/><path fill="#AF7749" d="M77.108,138.057c0.213-0.211,0.49-0.277,0.619-0.146l15.32,15.32c0.131,0.13,0.064,0.407-0.145,0.618l0,0    c-0.211,0.21-0.488,0.275-0.619,0.146l-15.32-15.32C76.835,138.543,76.899,138.267,77.108,138.057L77.108,138.057z"/><path fill="#AF7749" d="M44.388,105.335c0.211-0.211,0.488-0.276,0.619-0.147l15.32,15.321c0.129,0.13,0.064,0.407-0.146,0.618    l0,0c-0.211,0.21-0.488,0.275-0.617,0.146l-15.32-15.321C44.112,105.821,44.179,105.545,44.388,105.335L44.388,105.335z"/><g><path fill="#AF7749" d="M90.806,80.572c0,0.553-0.336,1.002-0.75,1.002l0,0c-0.414,0-0.75-0.449-0.75-1.002V64.119     c0-0.553,0.336-1.002,0.75-1.002l0,0c0.414,0,0.75,0.449,0.75,1.002V80.572z"/><path fill="#AF7749" d="M114.081,109.973c0.393,0.391,0.473,0.945,0.18,1.238l0,0c-0.293,0.293-0.848,0.213-1.24-0.178     l-11.633-11.635c-0.391-0.391-0.471-0.945-0.178-1.238l0,0c0.291-0.293,0.848-0.213,1.238,0.178L114.081,109.973z"/><path fill="#AF7749" d="M103.435,123.847c-0.551-0.03-0.98-0.391-0.959-0.804l0,0c0.023-0.414,0.49-0.725,1.043-0.693     l12.047,0.603c0.553,0.031,0.982,0.391,0.959,0.805l0,0c-0.023,0.412-0.488,0.725-1.041,0.693L103.435,123.847z"/><path fill="#AF7749" d="M85.784,95.796c0.553-0.022,1.016,0.294,1.033,0.707l0,0c0.018,0.414-0.418,0.769-0.969,0.792     l-16.439,0.688c-0.553,0.023-1.016-0.293-1.033-0.707l0,0c-0.016-0.414,0.418-0.768,0.971-0.791L85.784,95.796z"/><path fill="#AF7749" d="M69.813,97.529c-0.34,0.436-0.881,0.584-1.207,0.329l0,0c-0.326-0.255-0.316-0.815,0.023-1.251     c0,0,5.059-3.619,8.063-7.931c3.006-4.312,6.881-9.872,6.881-9.872c0.34-0.436,0.881-0.584,1.207-0.329l0,0     c0.326,0.255,0.314,0.815-0.025,1.252c0,0-4.301,6.222-6.91,9.909C75.233,93.324,69.813,97.529,69.813,97.529z"/><path fill="#AF7749" d="M89.772,108.546c0.553-0.022,1.016,0.294,1.031,0.707l0,0c0.018,0.414-0.416,0.769-0.969,0.792     l-16.439,0.688c-0.551,0.023-1.014-0.293-1.031-0.707l0,0c-0.018-0.414,0.418-0.768,0.969-0.791L89.772,108.546z"/><path fill="#AF7749" d="M95.284,117.37c0.551-0.057,1.031,0.23,1.074,0.643l0,0c0.043,0.412-0.369,0.793-0.918,0.85     l-25.594,2.787c-0.549,0.057-1.031-0.23-1.074-0.643l0,0c-0.043-0.412,0.371-0.792,0.92-0.849L95.284,117.37z"/><path fill="#AF7749" d="M73.8,110.279c-0.34,0.436-0.881,0.584-1.207,0.329l0,0c-0.326-0.255-0.314-0.815,0.025-1.251     c0,0,5.057-3.619,8.063-7.931c3.004-4.312,6.879-9.872,6.879-9.872c0.34-0.436,0.881-0.584,1.207-0.329l0,0     c0.328,0.255,0.316,0.815-0.023,1.252c0,0-4.301,6.222-6.912,9.909S73.8,110.279,73.8,110.279z"/><path fill="#AF7749" d="M93.716,98.536c-0.293,0.468-0.816,0.67-1.166,0.449l0,0c-0.352-0.221-0.396-0.78-0.104-1.247     c0,0,4.668-4.11,7.223-8.703c2.557-4.592,5.852-10.515,5.852-10.515c0.295-0.468,0.818-0.669,1.168-0.449l0,0     c0.35,0.221,0.395,0.78,0.102,1.248c0,0-3.652,6.624-5.879,10.556S93.716,98.536,93.716,98.536z"/><path fill="#AF7749" d="M113.118,80.572c0,0.553-0.336,1.002-0.75,1.002l0,0c-0.414,0-0.75-0.449-0.75-1.002V64.119     c0-0.553,0.336-1.002,0.75-1.002l0,0c0.414,0,0.75,0.449,0.75,1.002V80.572z"/><path fill="#AF7749" d="M107.265,122.947c0,0.553-0.336,1.002-0.75,1.002l0,0c-0.414,0-0.75-0.449-0.75-1.002l9.637,0.064     c0,0,5.238-0.625,6.551-1.75s2.344-4.838,2.344-5.856s0-2.917,0-2.917l0.814-23.826c0-0.553,0.336-1.002,0.75-1.002l0,0     c0.414,0,0.75,0.449,0.75,1.002l-0.814,23.657c0,0-0.037,2.319-0.104,2.963c-0.141,1.317-0.334,4.886-2.865,7.011     s-7.369,1.963-7.369,1.963L107.265,122.947z"/><path fill="#AF7749" d="M69.733,73.846c-0.553,0-1.002-0.336-1.002-0.75l0,0c0-0.414,0.449-0.75,1.002-0.75h60.625     c0.553,0,1.002,0.336,1.002,0.75l0,0c0,0.414-0.449,0.75-1.002,0.75H69.733z"/><path fill="#AF7749" d="M101.796,89.278c-0.553,0-1.002-0.336-1.002-0.75l0,0c0-0.414,0.449-0.75,1.002-0.75h23.813     c0.553,0,1.002,0.336,1.002,0.75l0,0c0,0.414-0.449,0.75-1.002,0.75H101.796z"/></g></g></g></svg>'
  };
});

app.directive("svgRecord", function () {
  return {
    restrict: 'AE',
    template: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="图层_1" x="0px" y="0px" width="60px" height="60px" viewBox="0 0 200 200" enable-background="new 0 0 60 60" xml:space="preserve"><g><path fill="#AF7749" d="M181.924,96.662c0,45.563-36.938,82.499-82.5,82.499c-45.564,0-82.5-36.937-82.5-82.499   c0-45.564,36.936-82.501,82.5-82.501C144.986,14.161,181.924,51.098,181.924,96.662z M99.424,19.161   c-42.803,0-77.5,34.697-77.5,77.501c0,42.801,34.697,77.499,77.5,77.499s77.5-34.698,77.5-77.499   C176.924,53.858,142.227,19.161,99.424,19.161z"/><g><g><g><path fill="#AF7749" d="M79.961,76.432c0-3.362,1.822-10.098,10.098-10.098h19.684c8.875,0,10.098,8.098,10.098,8.098v8.994      h2.098v-6.994c0-6.709-5.488-12.196-12.195-12.196H90.059c-6.707,0-12.195,5.487-12.195,12.196v6.994h2.098V76.432z"/></g><path fill="#AF7749" d="M99.633,33.854c-6.957,0-12.598,5.638-12.598,12.597c0,6.958,5.641,12.597,12.598,12.597     c6.955,0,12.582-5.639,12.582-12.597C112.215,39.492,106.588,33.854,99.633,33.854z M99.639,57.138     c-5.893,0-10.688-4.794-10.688-10.687c0-5.892,4.795-10.687,10.688-10.687c5.879,0,10.662,4.795,10.662,10.687     C110.301,52.344,105.518,57.138,99.639,57.138z"/><g><path fill="#AF7749" d="M46.859,137.357c0-3.362,1.822-10.098,10.098-10.098h19.684c8.873,0,10.098,8.098,10.098,8.098v8.994      h2.098v-6.994c0-6.709-5.488-12.196-12.195-12.196H56.957c-6.707,0-12.195,5.487-12.195,12.196v6.994h2.098V137.357z"/></g><path fill="#AF7749" d="M66.531,94.78c-6.957,0-12.598,5.638-12.598,12.597c0,6.958,5.641,12.597,12.598,12.597     c6.955,0,12.582-5.639,12.582-12.597C79.113,100.418,73.486,94.78,66.531,94.78z M66.535,118.063     c-5.893,0-10.688-4.794-10.688-10.687c0-5.892,4.795-10.687,10.688-10.687c5.881,0,10.664,4.795,10.664,10.687     C77.199,113.27,72.416,118.063,66.535,118.063z"/><g><path fill="#AF7749" d="M113.063,137.357c0-3.362,1.822-10.098,10.1-10.098h19.684c8.873,0,10.098,8.098,10.098,8.098v8.994      h2.098v-6.994c0-6.709-5.49-12.196-12.195-12.196h-19.684c-6.707,0-12.197,5.487-12.197,12.196v6.994h2.098V137.357z"/></g><path fill="#AF7749" d="M132.736,94.78c-6.959,0-12.598,5.638-12.598,12.597c0,6.958,5.639,12.597,12.598,12.597     c6.953,0,12.582-5.639,12.582-12.597C145.318,100.418,139.689,94.78,132.736,94.78z M132.74,118.063     c-5.893,0-10.688-4.794-10.688-10.687c0-5.892,4.795-10.687,10.688-10.687c5.879,0,10.664,4.795,10.664,10.687     C143.404,113.27,138.619,118.063,132.74,118.063z"/></g><path fill="#AF7749" d="M100.943,98.08c0,0.576-0.467,1.043-1.043,1.043l0,0c-0.576,0-1.043-0.467-1.043-1.043V83.438    c0-0.576,0.467-1.043,1.043-1.043l0,0c0.576,0,1.043,0.467,1.043,1.043V98.08z"/><path fill="#AF7749" d="M90.32,108.797c-0.406,0.407-1.068,0.406-1.475-0.001l0,0c-0.408-0.407-0.408-1.067,0-1.475l10.354-10.354    c0.408-0.407,1.068-0.407,1.475,0l0,0c0.408,0.408,0.408,1.068,0,1.476L90.32,108.797z"/><path fill="#AF7749" d="M110.957,107.32c0.408,0.407,0.406,1.068,0,1.476l0,0c-0.408,0.407-1.068,0.407-1.475,0L99.127,98.441    c-0.406-0.407-0.406-1.067,0-1.475l0,0c0.408-0.407,1.068-0.408,1.477,0L110.957,107.32z"/></g></g></svg>'
  };
});

app.directive("svgStar", function () {
  return {
    restrict: 'AE',
    template: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="图层_1" x="0px" y="0px" width="60px" height="60px" viewBox="0 0 200 200" enable-background="new 0 0 60 60" xml:space="preserve"><g><path fill="#AF7749" d="M181.924,96.662c0,45.563-36.938,82.499-82.5,82.499c-45.564,0-82.5-36.937-82.5-82.499   c0-45.564,36.936-82.501,82.5-82.501C144.986,14.161,181.924,51.098,181.924,96.662z M99.424,19.161   c-42.803,0-77.5,34.697-77.5,77.501c0,42.801,34.697,77.499,77.5,77.499s77.5-34.698,77.5-77.499   C176.924,53.858,142.227,19.161,99.424,19.161z"/><g><image stroke="null" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABNCAYAAAAxWePoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUY5NzkyMzE1QkIwMTFFN0FBOTJDNTEwMjRFQkY5MkUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUY5NzkyMzA1QkIwMTFFN0FBOTJDNTEwMjRFQkY5MkUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiBXaW5kb3dzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9IjgwMTlDQUQ3OTJBOTg5NDIyRTRFQzgwNUUwNDg3NDZCIiBzdFJlZjpkb2N1bWVudElEPSI4MDE5Q0FENzkyQTk4OTQyMkU0RUM4MDVFMDQ4NzQ2QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuDQ8usAABlDSURBVHja7FwJeFXVuf33PvdmIAEjEMAQmcI8yiAiYRAUEAEBhaKiVSv1w6Gt1feq9lmtbW2tbWl9Kq9a8T1F/ayCiCLFAQVEJlHCGCRAmBMSMkDme8/Z+61/nztmYDCJ8BWO38Vzz733nH3WXv/6p30itNZ0Lm2O30ebF88lX9lxvLMSHJvaSOnbc1FKGvUcdzuda5vnXBuQVg7lbF9LZUVHySNiBuHtneRx7ji89Utq0aEXte426JwarzzXABRSkuWNIcsTQ9IbO96K895meeKStFaUtXIBENYXADzZ5q8oJX9lOQkhvaT0aFJ0gjRd64mJo6M7v6K83ZsuAHiy7ei3G6nyRAEG5kmHPvsA3hPg5W08VAV73v3FexcAPJn+7VnzAczYwhu6iQStEh7xf9jvLjS1tryxVJC9jSpLCi8AWDuAiqpKikkKKwbsGwEAF2nSJ/DJAYA4mYGtPFFoWHoBwFq2wv07qKI4DxZrpUMDfUKKTUxFLeg9+I4fuF5G0BF45AsAVmNeAcDbvuxVo3NSyFsdUh9pUrYZpBCLwchuAPES9tDH9m6lqtLiCwAGt3LEfKuefxDAbEEIEx8HoIZLQe+EABZqnxBir1AiZMZHtn1pNPMCgAbAPFJIOaTl5ThvFKy2EpZaPV4BC2kGbJis2HjKePd5ylj0/AUAle2jzE9fJ5NSAjXt6JnQvqVa6Ch6CaHfE0Q9hBapYCN+5wcL1wRSvvMYwMNbV1PujvVkxcQSwEnEoaEA760aOinFXkCcDaBvMAOHFpYV5iC43nh+A3ho8xcmfTMgkRgDlnHYsjk6vxPmU1jv26DqTbwT+IBO5B04fwE8fni3iekspGmuPetbAdZS4KJd8/ZTUtvOlNC8DRwGHLLQi/BPF0mivYurRYUHviXOk88/AKF5Oz6eT77yE5z3MhxNcWgAwAuZrwN97DR0ErXs2Jscnw9MpX2ICvcAL2PGHphxYfZ2Ks07dP4BePzIHsrZsY68sU1cY1Q0DqFLEUa0JQiwB7rYuusASkrtEjBjNlrxDug53ZgxTN9fVUa5O786/wA8sn0t2VUVIWDAqpsBzBJyrZdsXwW1HzSWYhOTqGVaX1PeYlCFJYLeuJOLs6L8PZvpbBWGzwqAnHnkbF9H0uMNki1JkR5knEQAFG9cAnUZOc0tLCiXjQwSmzB29mJ3ujHjmHijo/lZ35w/AB7L3kqFB78lrq4Ys9RyItK1YxjNNqN9VZWUlj6ZmrXpYD5v2iqVhs56KuCMFbN2gdB6hmAzxkF/RZmpIZ43AObv2WI8bJiRegaweN+YL2sfMo02PQaHoxiwsHn7HpScdplxLIgTF+BrXfG7bsEwpyT/0HnEQAAoLSuY6CaDRwPxWsBvfWBTp3R43k59ogdqeeiiSzqS469i/5GF126AeKP7mUV5u84TE+auG1ecRQBAsGgSUrNcjGQ7a19c4kXUtu9wV/uqbc079KSY+KYgqQOuKuil+IHxy/huefFRc+5/ewC5DFVZUhAGSNNNSNMWsntwfFUGpJYd+9T6WwY2pXc6KQAlpbUIutldkOzK56oozqcTufv+/QGsOJ4Pwa8gLgjg5ttgpxdo+LZJ5BDXpfYbcdLfJ3ftb2qG0MFMePMsMHi6CDiS4sNZ3zuAp90X5tDDX1nmin8gdqNAuBFKxU5jY2+pHL/RNPz8eriN/ULqLD7vxZd2o45DJkSZu7+ihL1I6BhXX0QwN5bwxiRuwReeYo9+4OvlmKBjtY7dG59InYdPNddtyE0w7YuQk/rLS6kEiXk5TEEEAQpstq/SFDG55eiKuPs5B8KdrpxIXa6aVuPENhhReGBnGOzAlpe1CTf6KUKYOAbwM6nFMm2pZ7g4Gp/UipJS0igYTJcV5LjjkWEAuW7IJTCjfVr2RIyYATvqr6GhCmNz/P6aJTNMGOfT4x97w3j4BgVw7SuP0/6vP4GoewMRQU2rNuaGmzCfVQOEZ1SEZlWEPuYb9ZWX1NQMBM8m/lN0CQDcJKVI10Lt4d9ywSDSEZhzG63UUZWZ4Bh5D/5kBz5fSBY9VmfNEWNpcnErGvvwK25G05AmzN7Qg3xUBk8cBDAiNdLBf7UZNYko89AggIO4Vku8LHzFwm/5JDImNkEYQ8NLh/VWgDXscH+E3b0ueIFilrTOiCHaze3ewiDuxDmfw5mdyCELnqYAVzEQbZeVKoqN1yCEDextaCmsG9QX1QhT80D4GDPEzYjMBxAibxfy08O4xkW4jJ+8VnMGQWkFmmiL7ytwGiuQCCh85nOPAylpSZ5WYb6rvNroqmbacMrgADW/th0bn4dp6v7bAhR7gsiptVITHKAGe6J6H8Jd+hEmpHobkzgLo1rGOY0IA4h9ofgUFv7zFRfrFXPut8FejFzAjQufY9s+xXQW5HXvR3IaCdprh3+rXdLA2QsHX+Ov4vfiuNa2hUgg3tss+QUPSWcPwoh3cbnXAc5qCNtcXDxGGsa4Ym3URlqVUsgqnNLnV7rYzD9fEFPvQ+LPbAhIO8+wAptsKSULZhXG748is2vnmHkVaq1pxwnU9bTpjVgwdRb/hOQOFIvYMOxYquBt97gWIgxKmeB8Dww3NpIzOtrw+QKitPRY0LJEQAFggB6e9JjAlyXI4TW3Ym7GWJUnzHhRDsm4ztL6GfDoVwkea40HgqwA4lKyYnvjOy9gDq8UXvGoIhUiDF/TwWTa0Ch2KCKCKayNURIQuJTrbVVERTnSIqQbSAf6IA7OGX9RS+PR+fwdBo+j9oPGGAD5eKSXL4djWfb0HUbXQlooZSl0uNRlbgAe7NuIK6vBWF0DcB5fiNV8PllbZCfcMWPK73O0/qGw9DhJ/s8U8BBbP3iJvl3xttEfwZ7EoTngW2+y9J3cTowkTqsuA+jSAaONSbH2mTAG4UFicioyhMQIC1QIJwoMADXkBIDt/+pj2rvmAwMMO41WnfvRwBkPGS/MNx6s0tTqEOCBiw7uijLxjPdeoBM5+yKqO1y9iTO1ROU4JwcxEC7xOe2q8hqTbcavKJEc+TJ2UyBQM21/+UGOInpfdxd5ek/8MXniE2jrB//gi/qhdD8BQHeRLRZj/5dA+0NmNINxLHsbtcKguoy48ZQC3+Ti1nV+tvPTN0NSyIDwmr+EFimnF/mD6S069o46ltJ7GBXuy6SYIPAB8+ZyGBchTh3jOrTi+Z9TEcIuUT1OVKIviPYaxGotg+erLHVaduhF/abeTy2QNRm+dr/6Fuo59jZT6XAdG80DAwEiPQnpeNLIBXwFm9rm9+bSmnmPnXJW624irTKdOO7CBafYsavqFUq0AEgxTZqFnA3Lir+shNbP/11U1af2zoIy3ys8kFkDPKGtmcDgQyjjXIrR99hOldN+4BgaPvsZA15UKtd11HSjN9oNDjgY2QjfdLV2dC+w8X3MREvWLY6juB/75bzHTSX4TDY2kd2rFkZlA67jEPUCkEtf7S8fa/QzxFSv1zTsebVDXRt/vmber+jgps+RW3siwxgP4ofncO+/kh5xA14vsZPzQhb6TbnHyFaNXNgDAR953xwIeSLZSNlc5dTH4VCmQQvXw4+ugj4O56iOtStn25e06oUHKfPj16iqtOj02Jexko7u+jpUSGXGxCUmUds+w+od0PYafzs1bXWpyTpC4Sb261pPyMvkls+ZbcjATtBon3E+or3CvUJHOwkPpSuhvmK95+ZXz2vvoNimF0edx/r1r38dEnc2A/ZETPvS/EMhUcahLxAMZSM4mUsaUyX1umCWkJv5FcxyJX7b1LQgT7Z9/c4cN5cNzDYzste42yn1sqvqnxHExFPzdt3goD6iYKWa64TMstS+wykmIRwK7fjoVdry/osmUwpLidG78Qg2FgmPXAyzvQv3WcHazxPdB76i87ApNRxcCMCQnsC2ORvI370ZQFaFUztJWQB5Cc73KELKcUIKHqmPT8hFBta28sJck3PGNWtew3QzP3kdDFyBAYTZx7W9/tN+DpNIaJC0qklSsvH+7Ow4jmQQ7cpSc0+8yr/y+DHa9O5/U9bKhe5anCBBGHBbPAE1+Q2M935Y3FxXVbQhU6/xd1KPMbfWWoiotZyVetlISkufBNM8HhUzIR/aB/JcjTkpQvbyBWasXzBnZdCz1y2l1S8+YpafRW4l+Ydpx7JX3cVDEQWKbtfcYnLUBkztqdvomxB4Nws320EALmAc3rKaVv39F5S9/l8Ya1wIDPC0OYLcD3F7U2CyV2mpQjZfWVJEXeHJe4yZWecVazAwuDGTeOb4kQOTLoYrIsgy4JkQK0MTX8IAivE+w5wMwShXbI7u2kgJCGOatWlvluNugJer4gZ6oIhqknuwZeD0n59RKex0NpaS/N0ZVJp30IDELCvNP2gshCvhnkAf2o3vxBV4LYPbzAJ4k6H5R4NsYeZ1xwR3HTXjpPl5nQXVhBaXUArEnanPzW/tONUria+QV07FtX6hbZoLMzD0Yk2pwEDXv/4UHc/JNo7jWPb2aM9r29R5+JQoXWrIrVWX/m4QHwq+bRNcu84rEH454j4EyEth5s8hbLsNxyuDtcPKE0UGvL7Xz64hR2dUkebUatTPnqN2g64J1D6qrUGRCi5VD4WDSRFKrkYGY5rdHOpwrTBn+xqYzzeuHkWA522SEFU4bejNbchjcpSKKIEFvSzFa1u8AvAewd3fgDT22SCo3Crg/jM7DGZeg5T02Yn0mTCLulw1HYJcEQ2iq4tF2tJTcHyJtvVKreSUYFi0a8UCys/KCJup29OlfpPvNZPTKD2XwHrBxFbtyHHsaoEodccY12MgHcG6wZj8lcFYlFPCuIua0+Db/ot6T7jrtMcnTndJBLv8bUv+QXvWfsANnUDxQIcTEq762TQemvIypuU1BJ+POpxsB0IKYzVwHJ2GTqQB0x9sFPBYtz5/7mdUduyISQhClWtTGZTTlc9+UXqt+ZjwB4JlGf4Nf/eSHlfQ4JmPRgXJDQqgmcDKcjqem03fLHiWig9lGYEWgca3g4FYMTGEWLE9zOOfOG2ZsMRMeLVcgzMcEYvxmP94yS0aNBKAHz8zyzgNo3c8qezyHPEXzOFdGM89ipw3QimkrwKmfjEC5B9SxyuuO2kRo95NJdcsm5gH/kYgFywxXs5yAwE4iG1L55n1Lp74JvtxcDgGzanQBoB5K9LCVVzxaNtneKOBF663StfbM3iOSEWk8AZo0grvhynhbAlajF1VZpaOMOu4mdXoXbnIjVdM8StyG3L740jtHqKCAzsBdLwfg54N7zxbaLEMQjkEN7aFvTN7ucgmUYNvgUoMHFocrr8cju4IJGWwlrrEXTmiDFO5qnT5zY/UOw5tsDvh+Cr97j+Y8pEKdMZgPBuEJSvgpXMYNI4JG/PRBLYEtyqjWNeqtKWOkSX34S5L3CK/q9kcHI+Y/acGCeIblArMSvbYbOrGs2n6IRLx9ZjzfLPEWTRyHx9Cxysb3EnS3FqYT0pfDwuIc7OfCrq0/yjqO/meWpeOnHUAOWDdsuQlcqp45YEFFZII9txVB8H8t7G3pLZpkW+X4qqgJA0OtlT5iShVPbw5VwBkM+W1fW65XfbR3HmzoIHcjgH72LzqW/s7ZW2w++UUD9M0kyX1AYwkA25lmmviXiorOEKZH8831aZzDsD8PRlUXpRripNC6SmIkbYBvFwFTYptlkRX3vEEWNC4f2WAeyFSWKElv4gBF2Jvggg0vBnEzYv/bnLjcw5AfujF5z5tzqSbRIE1f5y+NUVmwBXvxt44wO945YRwKV/oRQAzFTrYMxLkyFz5nAGw6NAu5L3MMNEBFGiPwS92tc+m5LR+NTtejRQHcjfOMN1tm3ILbzdAnBBZ7s/NXB9K+84JAPN2fe0+bemJ5ZR3AnxwNs6+3y1zxdLBTZ+5i41Oc2ON4icy+TEwLkoU7NtxBo6kC9ieHFhJxn1SWoidyUH95WJHPsb6rekO1lMyGsx8d31jig1edhSKbkQI8V5oIQK8X/Gh3bQVufTIe/9cpyPhXjE/8u9FyldWmGteHG6Y5WkIjQZMe4CSO/c7acs06G25KLz7i0Vul1HI9xFO/RRm3AaA5gZTuaqyE2cfQM6Pj+xY6zaLuL+gdQvNf+NA0k8iswMOtIth4ryStLZ0jpey5e7cYJo9nDNzmsgVEWQysVogKAaIG974gynEtht4NdKv7pSU2pkSW7atdVxcgt+/8RPyl5ewWW+CEykAaGMwpfNdq0BIs2+7KXDUp6hbbwC5H7Lh9afCi34cMQaIHYUr3FFdm7iik5u5wbQgg8VLLv8f2voF5Wxba7p7JkV0q8UJyGOfB2uukpacpSQtZ2C5zZAJ0+MKC/dSeMkv1ytbdx0UlSKadYwBR4GwCjGN+FA7zlThcQHkrIVDmuLDu2s06r83AJlNzBruiHGoEnhK4QYpxUe6lr+QwzO9dek82rVyQQhANlO+WRN+BNbX4HaHkaNf5KfUtVB/U454E5j+L3nEY8Jj2V7LrdVxq4FZxq+WaX2o78S7o8AwtctgOCPFAq3EW3ifCOxLTdsT0QF3FOsDYL2cSP7uTbTutd+amMtUfLVIFJqGYH9RXcVZ1snS/MPmxeBxbdGYqkmtkLw44rcAbzFGBsAQCnnoWWmJ0fj1SLJpDVjZM7xUTxpz59exvdto1f/8J3315tPkg7bFNW1u8t1mKWnuok2h1wteKaZpaGTqV1LPBxW/M4CcV+bAHCMrtwAyHfNdqoTeeLIwg0XevLhPEnyIUMsuQonV7C2hf+MQC/85WLAFC7cDyHR86VMA+Jl05OzaAmjOgLjr9tmz99PBjBXmIcVWnS8zlXBNCjatV+FkU8PFB4uqSorq9bisrI/zyEGIEdmqFPz8mqDlxggjATtV4q7ELO3oNdjLIIsu11JtjDLDYD/Aol+SJW9Wmh7UfoQmmlpGOnRmJE9o6bHDtO7VJ81abF4mF+5AKNaOkZGr1uv7rPF3N2Ewx10pGkqZuJM9DGi8G3lTrHOqrkFq0Rwx9jsIe57A6e4k6dxHhilh8C1eceePWHwk1edg5yB8v4L8tFHbYlwNrUXcaVkx5o9S7Fz+ZqD7x4um5AqMMwGevd85V0wAjAM54oPHXFtj4VZtbQMlroU5fm2ZFUs0QHv0kshvMfAc8A6543Fq2amv0TV33Qv/IR51AiZ9K672ON7MA4h/NBMYyUacljuD7CSat+seKKXpElxjI7zP5HMOQKFoCgb4pQ70V+tuwogYqeTfQMr5YNifyFI34GB+TdCVYRIv6hz249+bOmOTpNZusdR2FUJb6jVh6eFwWoPAxrVki55RIHLzCzprVmiFHthWi5CajBENVBVqEADNww2KxiLg/ecptK4f1HEdOxuY4Qgtnbm6jnWGvETY26Rp6OnNnuPvoLG/eJk6XjHB5LnGs2pTu88mS1+tpF4EzD8WtrgnGhzhFneDMaGkf+FAMi7bjo9z3FmfQm+9NDCYkmktumshmoIJq+qCmBz5AMb7OVi3DCY7BDeeWXtR1m9ML6VPOg2+5eGoRY8cR/af9lNK/7Gbkdi+8pCAIEB+Cq9pAPU+5SdeNN8i6vrhYRdgnFnw+tfxKrFSBNO1Pc/S6ACapwNk6JkSLl1lCKFLq+MG1rUVNi0DBe5HPHcjWPdLTbpGaZoLoJx2cWqWPut3NPzup82yktq25LS+dOWPfkPNWrd3/2xAQIQxKeugpYMBUp629TqERRNqtVRBS2AF17J5lxfmmT7y9w6gu9A8gIPS1wnzp+qqbY68EUzYoKUsEB5xOcT/8xqMc2zzoCDnyl1Hz6Cr7v+rSc9OVfq6GDHe6J89T5cOGGUWP4bbBbqcPHo2PO4jOPSc9ou/ANwoBwOpYQDTcDypvm2a+ldjtGwrhJVCUn8SoYkJiOvmgJlTkUI9hLhufpTWaXedDbOHFzGl9h1BacOngn0pZ3RpXkVw+c0Pm9jv0KYVZsmcDjgfhDsLYaprtE0vw7mshmzMwhi3us6FDsIy8pSjRiD5ef+sAggsxgup90Cm880sOwiEFb0KBuWBdUMQvO6NyFSMd2XvGBPXlLqNmgHgppi067tuDNbAHzxEPa6ZSfsROPMCdvPcsDZxZI7wiglCyQccx1kilP4jxjQ3kHp+Asc3Eac4uwDCfCcrqd4id5Xnf+H9A2SJv2K2f69JRZk8Fwu4Ot130t3UFqw71dKxM9maNG9jSliceSz/672GjZwtmRRP6r9Z0rOcbPUq2XocecSPoJfzoePvAswYXml7VgBEktYSriQVXjhLOEjhNKXAVCbBfNZF582VJu/sMfZWatd/lGGcsBqnucSV6GseetHIQ9aqhZS9ZolbqLBoq7EIWz+NXPpLmO5PMK3HAGB//Gz9WQEQ1ngFBDkNwfEi/P9dxHbXA9WySLnjsIRBY/ASky9t8AeeaytWBJtXXMFuntqVvln4rCl+eGLifbjjB2HBnyPw/5OwRCdyxMj6APjdwxjXrXHxoARnuRvg3QOziAKPAmUuNq1mbTo2Oni1bR2GXEcj751DKb2GGlbyw0SOU/GBrapG+yrL33eqfBO10p7vnYHAJlEpmQMAhyId21/3g0virPw1jcitRcdedOWdT5q101wRLzy4k/W40Py1OGVN8sQ15WpDwXc59/8LMADj+/nY1JQBxQAAAABJRU5ErkJggg==" id="svg_4" height="129" width="126" y="28" x="38"/></g></g></svg>'
  };
});

app.directive("svgCircle", function () {
  return {
    restrict: 'AE',
    template: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="图层_1" x="0px" y="0px" width="60px" height="60px" viewBox="0 0 200 200" enable-background="new 0 0 60 60" xml:space="preserve"><g><path fill="#AF7749" d="M181.924,96.662c0,45.563-36.938,82.499-82.5,82.499c-45.564,0-82.5-36.937-82.5-82.499   c0-45.564,36.936-82.501,82.5-82.501C144.986,14.161,181.924,51.098,181.924,96.662z M99.424,19.161   c-42.803,0-77.5,34.697-77.5,77.501c0,42.801,34.697,77.499,77.5,77.499s77.5-34.698,77.5-77.499   C176.924,53.858,142.227,19.161,99.424,19.161z"/><g><image xlink:href="data:image/png;base64,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" id="svg_1" height="130" width="130" y="33" x="35"/></g></g></svg>'
  };
});

app.directive('ionImg', function () {
  return {
    scope: {
      ngsrc: '@',
      ngopt: '@',
    },
    link: function ($scope, $dom) {
      var src = $scope.ngsrc;
      var ngopt = $scope.ngopt;
      var dom_image = angular.element($dom)[0];
      var img_src_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAIAAAADwcZiAAAAW0lEQVRYCe3SMQ7AMAzDwLb//6k/UWTnyGQJPWqQgIPfmXmO33d8cQ22ups94YQ9gb7Js+SmhNnFSxP2LLkpYXbx0oQ9S25KmF28NGHPkpsSZhcvTdiz5KabhH9OFAMPqToRyQAAAABJRU5ErkJggg==";
      dom_image.src = img_src_default;
      if (ngopt) {
        ngopt = ngopt.split(',');
        var offset = ngopt[0];
        var scale = ngopt[1];
        dom_image.width = screen.width + parseInt(offset);
        dom_image.height = dom_image.width * scale;
      }
      var image = new Image();
      image.src = src;
      image.onload = function () {
        dom_image.src = src;
      };
    },
  };
});

app.directive('ngThumb', ['$window', function ($window) {
  var helper = {
    support: !!($window.FileReader && $window.CanvasRenderingContext2D),
    isFile: function (item) {
      return angular.isObject(item) && item instanceof $window.File;
    },
    isImage: function (file) {
      var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }
  };

  return {
    restrict: 'A',
    template: '<canvas/>',
    link: function (scope, element, attributes) {
      if (!helper.support) return;

      var params = scope.$eval(attributes.ngThumb);

      if (!helper.isFile(params.file)) return;
      if (!helper.isImage(params.file)) return;

      var canvas = element.find('canvas');
      var reader = new FileReader();

      reader.onload = onLoadFile;
      reader.readAsDataURL(params.file);

      function onLoadFile(event) {
        var img = new Image();
        img.onload = onLoadImage;
        img.src = event.target.result;
      }

      function onLoadImage() {
        var width = params.width || this.width / this.height * params.height;
        var height = params.height || this.height / this.width * params.width;
        canvas.attr({ width: width, height: height });
        canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
      }
    }
  };
}]);

app.directive("ngTouchstart", function () {
  return {
    controller: ["$scope", "$element", function ($scope, $element) {

      $element.bind("touchstart", onTouchStart);
      function onTouchStart(event) {
        var method = $element.attr("ng-touchstart");
        $scope.$apply(method);
      }

    }]
  }
})
app.directive("ngTouchmove", function () {
  return {
    controller: ["$scope", "$element", function ($scope, $element) {

      $element.bind("touchstart", onTouchStart);
      function onTouchStart(event) {
        event.preventDefault();
        $element.bind("touchmove", onTouchMove);
        $element.bind("touchend", onTouchEnd);
      }
      function onTouchMove(event) {
        var method = $element.attr("ng-touchmove");
        $scope.$apply(method);
      }
      function onTouchEnd(event) {
        event.preventDefault();
        $element.unbind("touchmove", onTouchMove);
        $element.unbind("touchend", onTouchEnd);
      }

    }]
  }
})
app.directive("ngTouchend", function () {
  return {
    controller: ["$scope", "$element", function ($scope, $element) {

      $element.bind("touchend", onTouchEnd);
      function onTouchEnd(event) {
        var method = $element.attr("ng-touchend");
        $scope.$apply(method);
      }

    }]
  }
});
app.directive('resizeFootBar', ['$ionicScrollDelegate', function ($ionicScrollDelegate) {
  // Runs during compile
  return {
    replace: false,
    link: function (scope, iElm, iAttrs, controller) {
      scope.$on("taResize", function (e, ta) {
        if (!ta) return;
        var scroll = document.body.querySelector("#message-detail-content");
        var scrollBar = $ionicScrollDelegate.$getByHandle('chat-scroll');
        // console.log(scroll);
        var taHeight = ta[0].offsetHeight;
        var newFooterHeight = taHeight + 10;
        newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;

        iElm[0].style.height = newFooterHeight + 'px';
        scroll.style.bottom = newFooterHeight + 'px';
        scrollBar.scrollBottom();
      });
    }
  };
}]);