import React, { useState } from 'react'

import MyDropzone from '../../utils/Upload'

import { Typography, Input, Button, Form } from 'antd'
import Axios from 'axios'

const { Title } = Typography
const { TextArea } = Input
const continent = [
    { key: 1, value: 'Africa' },
    { key: 2, value: 'Asia' },
    { key: 3, value: 'Europe' },
    { key: 4, value: 'North America' },
    { key: 5, value: 'South America' },
    { key: 6, value: 'Australia' }
]


function UploadProductPage(props) {
    //保存images
    const [Images, setImages] = useState([])
    // 利用useState函数来更改变量的值
    const [titleValue, setTitleValue] = useState('')
    const [DescriptionValue, setDescriptionValue] = useState('')
    const [PriceValue, setPriceValue] = useState(0)
    const [ContinentValue, setContinentValue] = useState(0)
    //titleChange
    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }
    //descriptionChange
    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }
    // priceChange
    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }
    const onContinentChange = (event) => {
        setContinentValue(event.currentTarget.valule)
    }
    const refreshImage=(images)=>{
        setImages(images)
        console.log(images )
    }

    //提交数据
    const onsubmit=(event)=>{
        event.preventDefault()//阻止默认的提交事件
        //提交数据

        const variables={
            writer:props.user.userData._id,
            images:Images,
            price:PriceValue,
            title:titleValue,
            description:DescriptionValue,
            continent:ContinentValue
        }
        Axios.post('/api/product/uploadProduct',variables).then(res=>{
            if(res.data.success){
                alert('product save sucessfully!')
                props.history.push('/')
            }else{
                alert( ' falied to save productinfo!')
            }
        })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem  auto' }}
        >
            <div style={{ textAlign: 'left', marginBottom: '2rem' }}

            >
                <Title>Upload Travel Product</Title>
                <MyDropzone refresh={refreshImage} />
                <Form >
                    <br />
                    <br />
                    <label>Title</label>
                    <Input onChange={onTitleChange}
                        value={titleValue}
                    />
                    <br />
                    <label>
                        Description
                    </label>
                    <TextArea
                        onChange={onDescriptionChange}
                        value={DescriptionValue}
                    />
                    <br />
                    <br />
                    <label>
                        Price($)
                    </label>
                    <Input
                        onChange={onPriceChange}
                        value={PriceValue}
                        type="number"
                    />
                    <br />
                    <select
                        onChange={onContinentChange}
                        value={ContinentValue}
                    >
                        {continent.map(d => (
                            <option key={d.key} value={d.value}>
                                {d.value}
                            </option>
                        ))}
                    </select>
                    <br />
                    <br />
                    <Button
                        onClick={onsubmit}
                    >
                        Submit
                    </Button>



                </Form>
            </div>
        </div>
    )
}

export default UploadProductPage
