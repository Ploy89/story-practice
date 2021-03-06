import React, { FC, useEffect, useState } from 'react'
// import { ReactComponent as CheckBadge } from '../../assets/images/check-badge.svg'
import  './ColorPicker.module.less'
import classNames from 'classnames'
import { CheckOutlined, PlusOutlined } from '@ant-design/icons'
import { SketchPicker } from 'react-color'
interface P {
  color: string
  selected: boolean
  isDarkColor?: boolean
  onClick(): void
  onHover?(): void
  onLeave?(): void
}

const ColorItem: FC<P> = ({
  color,
  selected,
  isDarkColor = false,
  onClick,
  onHover,
  onLeave,
}) => {
  return (
    <div
      className={classNames(
        "colorItem",
        selected && "selectedColor",
        !isDarkColor && "toggleOpacity"
      )}
      style={{
        backgroundColor: selected ? '#fff' : color,
        // border: hovering || selected ? '1px solid #54B2D3' : 'none',
        boxSizing: 'border-box',
        // opacity: hovering || selected ? '1' : '0.2',
      }}
      onClick={() => {
        onClick()
      }}
      onMouseEnter={() => onHover?.()}
      onMouseLeave={() => onLeave?.()}
    >
      <CheckOutlined className={"badge"} />
    </div>
  )
}

interface PickerProps {
  heading: string
  selectedColor?: string
  isDarkColor?: boolean
  onSelected(val:any): void
  onHover?(val:any): void
  onLeave?(val:any): void
}

const colorData = [
  '#03dbfc',
  '#fca903',
  '#8c03fc',
  '#0ffc03',
  '#03fcfc',
  '#5e03fc',
  '#03e7fc',
  '#45fc03',
  '#84fc03',
  '#fcf403',
  '#fcce03',
  '#d2fc03',
  '#f4fc03',
  '#bf15c2',
  '#486578',
]

export const ColorPicker: FC<PickerProps> = ({
  heading = 'Background color',
  selectedColor = '',
  isDarkColor = false,
  onSelected,
  onHover,
  onLeave,
}) => {
  const [colorList, setColorList] = useState(colorData)

  const [selColor, setSelColor] = useState(selectedColor)
  const [isAddingColor, setIsAddingColor] = useState(false)

  useEffect(() => {
    setSelColor(selectedColor)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor])
  const onClickColorItem = (color:any) => {
    setSelColor(color)
    onSelected(color)
  }
  const onClickAddCustomColor = () => {
    setIsAddingColor((e) => !e)
  }
  const handleChangeComplete = (color:any) => {
    onClickColorItem(color.hex)
    colorData.pop()
    colorData.push(color.hex)
    setColorList(colorData)
    setIsAddingColor((e) => !e)
  }

  return (
    <div>
      {' '}
      {/*  style={{ marginTop: '16px' }} */}
      <span className={"heading"}>{heading}</span>
      <div className={"colorPickerWrap"}>
        {colorList.map((color) => (
          <ColorItem
            key={`${heading}${color}`}
            color={color}
            selected={color === selColor}
            isDarkColor={isDarkColor}
            onClick={() => onClickColorItem(color)}
            onHover={() => onHover?.(color)}
            onLeave={() => onLeave?.(color)}
          />
        ))}
        <div
          className={"addColor"}
          onClick={() => onClickAddCustomColor()}
        >
          <PlusOutlined />
        </div>
      </div>
      {isAddingColor && (
        <SketchPicker
          className={"customPicker"}
          color={selColor}
          presetColors={[]}
          disableAlpha={true}
          onChangeComplete={(color:any) => handleChangeComplete(color)}
        />
      )}
    </div>
  )
}

export default ColorPicker
