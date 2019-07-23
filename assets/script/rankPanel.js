// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

        rankContext: {
            default: null,
            type: cc.Node,
        },
      
        sharedCanvas: null,
        needUpdate: false,
        texture: null,
        spriteFrame: null,
        openDataContext: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.texture = new cc.Texture2D()
        this.rankContext = this.node.getChildByName('rankCanvas').getComponent(cc.Sprite)
        this.openDataContext = wx.getOpenDataContext()
        this.sharedCanvas = this.openDataContext.canvas
    },

    start () {
        this.initCanvas()
        //this.showCanvas()
    },

    initCanvas() {
        this.sharedCanvas.width = 700
        this.sharedCanvas.height = 400
    },
    
    update (dt) {
        if (this.needUpdate) {
            this.texture.initWithElement(this.sharedCanvas)
            this.texture.handleLoadedTexture()
            this.spriteFrame = new cc.SpriteFrame(this.texture)
            //console.log('获得的texture为 ', this.texture)
            this.rankContext.spriteFrame = this.spriteFrame
            //console.log('主域获取的的canvas ', this.sharedCanvas)
        }
    },
    
    showCanvas () {
        if (!this.sharedCanvas) {
            this.initCanvas()
        }
    
        this.openDataContext.postMessage({
            message: 'render'
        })

        this.needUpdate = true    
      },
    
    hideCanvas () {
        if (this.spriteFrame) {
          this.spriteFrame.clearTexture()
          this.spriteFrame = null
        }
    
        if (this.texture) {
          this.texture.destroy()
        }
    },
});
