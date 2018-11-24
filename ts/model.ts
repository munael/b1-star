type Idx = number
type Color = p5.Color

type Model = {
    version: string
    lo: Layout
    cbob: CBob
    hist: Hist
    ui: Ui
}

type Layout = {
    bobs: Bob[]
}

type Bob = {
    posx: number
    posy: number
    dimx: number
    dimy: number

    orientation: number

    color: Color

    
}