import HttpBaseController from '@themost/web/controllers/base';
import {httpController,httpGet, httpAction} from '@themost/web/decorators';

@httpController()
class TestController extends HttpBaseController {
    
    constructor() {
        super();
    }
    
    @httpGet()
    @httpAction('index')
    getIndex() {
        return this.view();
    }
    
}

module.exports = TestController;
