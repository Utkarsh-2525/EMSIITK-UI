import React from "react";
import Card from "../../UI/card/Card";
import {Link} from "react-router-dom";
import {IProductsTable as Props} from "../../../interfaces/Itable";
import classes from "./EditProduct.module.scss";
import {Icon} from "@iconify/react";
import Button from "../../UI/button/Button";
import Input from "../../UI/input/Input";

const EditProduct: React.FC<{ product?: Props }> = (props) => {
    return (
        <div className={classes.edit__container}>
            <div className={classes.edit__left}>
                <Card>
                    <div className={classes.img_wrapper}>
                        <img className={classes.pic} src={props.product?.pic} alt="product pic"
                        />
                    </div>
                    <div className={classes.product__info}>
                        <div>
                            <div className={classes.title}>{"Product Name"}</div>
                            <div className={classes.value}>
                                {`${props.product?.product}`}
                            </div>
                        </div>
                        <div>
                            <div className={classes.title}>{"Category"}</div>
                            <div className={classes.value}>
                                {`${props.product?.category}`}
                            </div>
                        </div>
                        <div>
                            <div className={classes.title}>{"Price"}</div>
                            <div className={classes.value}>
                                {`${props.product?.price}`}
                            </div>
                        </div>
                        <div>
                            <div className={classes.title}>{"Inventory Count"}</div>
                            <div className={classes.value}>
                                {`${props.product?.inventory}`}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className={classes.edit__right}>
                <Card>
                    <div className={classes.product__edit}>
                        <h3 className={classes.subTitle}>
                            <Icon icon="fluent:edit-16-regular" width="24"/>
                            &nbsp;{("Edit")}
                        </h3>
                        <div className={classes.img_wrapper}>
                            <div className={classes.upload_icon}>
                                <Icon icon="akar-icons:cloud-upload"/>
                            </div>
                            <div className={classes.file_input_control}>
                                <input className={classes.file_input} type="file" id="pic" name="pic"
                                       accept="image/png, image/jpeg"/>
                            </div>
                            <img className={classes.pic} src={props.product?.pic} alt="product pic"/>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                        }}
                        >
                            //@ts-ignore
                            <Input id="Product Name" type="text" placeholder={props.product?.product}/>
                            <Input id="Category" type="text" placeholder={props.product?.category}/>
                            <Input id="Price" type="text" placeholder={props.product?.price}/>
                            <Input id="inventoryCount" type="number" placeholder={props.product?.inventory.toString()}/>
                            <div className={classes.btn__wrapper}>
                                <Link to="/products">
                                    <Button type="submit">{"Update"}</Button>
                                </Link>
                                <Link to="/products">
                                    <Button outline={true}>{"Cancel"}</Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default EditProduct;
