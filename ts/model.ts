type Idx = number
type Color = p5.Color

type Model = {
    version: string
    lo: Layout
    cbob: CBob
    hist: Hist
    ui: AppChromeModel
}

type Layout = {
    bobs: Bob[]
}

enum BobOrientation {
    North, South, East, West
}

type Bob = {
    posx: number
    posy: number
    dimx: number
    dimy: number

    orientation: BobOrientation

    color: Color
}


