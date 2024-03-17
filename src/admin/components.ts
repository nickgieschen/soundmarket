import {ComponentLoader} from 'adminjs'

const componentLoader = new ComponentLoader()

const components = {
    GenreMerger: componentLoader.add('GenreMerger', './admin/resources/genres/merge-action.js'),
}

export {componentLoader, components}