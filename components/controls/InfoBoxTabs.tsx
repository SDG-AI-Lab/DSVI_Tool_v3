import React, { useState } from 'react'
import { tabContent } from '../content/infoBoxContent'
import Dropdown from 'react-dropdown'
import { Carousel } from 'react-responsive-carousel'

export default function InfoBoxTabs() {
  const [openTab, setOpenTab] = useState(1)
  const [dropDownDesc, setDropDownDesc] = useState('')
  const [dropDownHeading, setDropDownHeading] = useState('')

  const renderCarouselImages = (imageLinks: string[]) => {
    return imageLinks.map((link) => {
      return (
        <img key={link} style={{ width: '100px' }} src={link} alt="poverty" />
      )
    })
  }

  const renderTabs = () => {
    return (
      <>
        <div className="mb-3 flex items-start">
          <ul
            className="nav nav-tabs mr-1 flex list-none flex-col flex-wrap border-b-0 pl-0"
            role="tablist"
          >
            {tabContent.map((tab, index) => {
              return (
                <li
                  key={index}
                  className="nav-item flex-grow text-left"
                  style={{
                    background:
                      openTab === index + 1 ? '#e6f9ff' : 'transparent',
                  }}
                >
                  <a
                    className="block rounded px-5 py-1 text-base leading-normal text-black"
                    onClick={(e) => {
                      e.preventDefault()
                      setOpenTab(index + 1)
                    }}
                    data-toggle="tab"
                    href={`#link${index + 1}`}
                    role="tablist"
                  >
                    {tab.tabHead}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="tab-content">
            <div className="ml-20 flex-auto">
              {tabContent.map((tab, index) => {
                return (
                  <div
                    key={index}
                    className={`${
                      openTab === index + 1 ? 'block' : 'hidden'
                    } tab-pane fade show active`}
                    style={{ width: '150px' }}
                    id={`link${index + 1}`}
                  >
                    <Carousel
                      className="info_carousel"
                      showArrows={false}
                      showIndicators={false}
                      showThumbs={false}
                      showStatus={false}
                    >
                      {renderCarouselImages(tab.imgLinks)}
                    </Carousel>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {tabContent.map((tab, index) => {
          if (!tab.text) return
          return (
            <div
              key={index}
              className={`${
                openTab === index + 1 ? 'block' : 'hidden'
              } square my-3 mb-3 mt-5 max-w-md px-4 text-justify leading-relaxed`}
            >
              <h1 className="text-xl font-semibold leading-10">
                {tab.text.h1}
              </h1>
              <p>{tab.text.p}</p>
            </div>
          )
        })}
        {tabContent.map((tab, index) => {
          if (!tab.dropdown) return
          const dropDown = tab.dropdown

          const dropDownOptions = dropDown.map((x) => x.heading)

          return (
            <div
              key={index}
              className={`${
                openTab === index + 1 ? 'block' : 'hidden'
              } square my-3 mb-3 mt-5 max-w-md px-4 text-justify leading-relaxed`}
            >
              <Dropdown
                menuClassName="max-w-11/12 left-4p rounded-xl h-50"
                controlClassName="rounded-xl w-11/12 m-auto"
                options={dropDownOptions}
                onChange={(e) => {
                  const currentOption = dropDown.filter(
                    (x) => x.heading === e.value
                  )[0]
                  setDropDownDesc(currentOption.desc)
                  setDropDownHeading(currentOption.heading)
                }}
                value={dropDownHeading}
                placeholder="Select an option"
              />
              <div className="square mt-5 max-w-md px-4">
                <p className="my-3 mb-3 text-justify leading-relaxed">
                  {dropDownDesc}
                </p>
              </div>
            </div>
          )
        })}
      </>
    )
  }

  return <>{renderTabs()}</>
}
