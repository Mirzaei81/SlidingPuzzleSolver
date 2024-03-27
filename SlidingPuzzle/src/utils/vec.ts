class vec2{
    /**
     * x:number
     *  y:number
     * create 2d Vector 
     */
    x:number;
    y:number
    constructor(x:number,y:number) {
        this.x=x;
        this.y=y
    }

    add(vec:vec2){
        if(this.x+vec.x<0||this.y+vec.y<0){
            return null;
        }
        return new vec2(this.x+vec.x,this.y+this.y)
    }
}