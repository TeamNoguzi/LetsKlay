import React, {useState, useEffect} from 'react';

import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Image,
    InputGroup,
    FormControl,
    Placeholder
} from 'react-bootstrap';

import styles from './PictureForm.module.css';

interface PictureFormProps {

};

interface Picture{
    url:string,
    name:string,
}

const PictureForm:React.FC<PictureFormProps> = ({}) => {
    const [thumbnail, setThumbnail] = useState<Picture>({url:'', name:''});
    const [mainPic, setMainPic] = useState<Picture>({url:'', name:''});

    useEffect(() => {
        return () => {
            window.URL.revokeObjectURL(thumbnail.url);
            window.URL.revokeObjectURL(mainPic.url);
        }
    })

    const handleUploadThumbnail = async (e:React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files) {
            const buf = await files[0].arrayBuffer();
            const blob = new Blob([buf], {type:'image/png,jpeg'});
            setThumbnail({url:window.URL.createObjectURL(blob), name:files[0].name});
        }
    }
    const handleUploadMainPic = async (e:React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files) {
            const buf = await files[0].arrayBuffer();
            const blob = new Blob([buf], {type:'image/png,jpeg'});
            setMainPic({url:window.URL.createObjectURL(blob), name:files[0].name});
        }
    }

    return (
        <Container className={styles['container']}>
            <Row>
                <h4>Thumbnail</h4>
            </Row>
            <Row className="d-lg-none">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Etiam bibendum erat id arcu suscipit mattis. 
                    Pellentesque dignissim nunc eu tortor molestie luctus. 
                    In a magna ipsum. Vestibulum sed metus sed.
                </p>
            </Row>
            <Row>
                <Col lg={8} xs={12}>
                    <Form.Label className={styles['label']}>Thumbnail</Form.Label>
                    <InputGroup>
                        <Button className={styles['button-file']}>
                            <Form.Label 
                                className={styles['label-file']} 
                                htmlFor="input-thumbnail" 
                            >
                                Upload
                            </Form.Label>
                        </Button>
                        <FormControl value={thumbnail.name} type="text" placeholder="Upload Image..." readOnly/>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl 
                            className={styles['input-file']} 
                            type="file" 
                            id="input-thumbnail"
                            onChange={handleUploadThumbnail}
                        />
                    </InputGroup>
                </Col>
                <Col lg={4} className="d-none d-lg-block">
                    <p className="pt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Etiam bibendum erat id arcu suscipit mattis. 
                        Pellentesque dignissim nunc eu tortor molestie luctus. 
                        In a magna ipsum. Vestibulum sed metus sed.
                    </p>
                </Col>
            </Row>
            <Row>
                <span className={styles['label']}> Preview </span>
                <div className={`px-2.5 ${styles['thumbnail-wrap-outer']}`}>
                    <div className={styles['thumbnail-wrap-inner']}>
                    {
                        thumbnail.url?
                        <Image src={thumbnail.url} className={styles['image-thumbnail']}/>
                        :<Placeholder className={styles['image-thumbnail']}/>
                    }
                    </div>
                </div>
            </Row>

            <hr/>

            <Row>
                <h4>Main Picture</h4>
            </Row>
            <Row className="d-lg-none">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Etiam bibendum erat id arcu suscipit mattis. 
                    Pellentesque dignissim nunc eu tortor molestie luctus. 
                    In a magna ipsum. Vestibulum sed metus sed.
                </p>
            </Row>
            <Row>
                <Col lg={8} xs={12}>
                    <Form.Label className={styles['label']}>Main Picture</Form.Label>
                    <InputGroup>
                        <Button className={styles['button-file']}>
                            <Form.Label 
                                className={styles['label-file']} 
                                htmlFor="input-mainPic" 
                            >
                                Upload
                            </Form.Label>
                        </Button>
                        <FormControl value={mainPic.name} type="text" placeholder="Upload Image..." readOnly/>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl 
                            className={styles['input-file']} 
                            type="file" 
                            id="input-mainPic"
                            onChange={handleUploadMainPic}
                        />
                    </InputGroup>
                </Col>
                <Col lg={4} className="d-none d-lg-block">
                    <p className="pt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Etiam bibendum erat id arcu suscipit mattis. 
                        Pellentesque dignissim nunc eu tortor molestie luctus. 
                        In a magna ipsum. Vestibulum sed metus sed.
                    </p>
                </Col>
            </Row>
            <Row>
                <span className={styles['label']}> Preview </span>
                <div className={`px-2.5 ${styles['mainPic-wrap-outer']}`}>
                    <div className={styles['mainPic-wrap-inner']}>
                        {
                            mainPic.url?
                            <Image src={mainPic.url} className={styles['image-mainPic']}/>
                            :<Placeholder className={styles['image-mainPic']}/>
                        }
                    </div>
                </div>
            </Row>

            <hr/>
        </Container>
    )
}

export default PictureForm;
export type {PictureFormProps}