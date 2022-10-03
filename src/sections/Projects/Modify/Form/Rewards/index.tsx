import { Container, Form, Row, Col } from "react-bootstrap";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import Button from "stories/Buttons/Button";
import { FindProjectFullResponseDto, CreateRewardDto, FindRewardResponseDto } from "@/dto";
import { useProjectUpdateMutation } from "hooks";
import React, { useState } from "react";
import RewardCard from "stories/Cards/RewardCard";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { css } from "@emotion/react";
import moment from "moment";
import produce from "immer";
import * as S from "./styled";
import FormRewardItems from "./RewardItems";

interface FormInput {
  rewards: CreateRewardDto[];
}

interface FormRewardsProps {
  project: FindProjectFullResponseDto;
}

const FormRewards = ({ project }: FormRewardsProps) => {
  const [selected, setSelected] = useState<number | false>(0);
  const mutation = useProjectUpdateMutation();
  const { register, handleSubmit, watch, setValue, control } = useForm<FormInput>({
    defaultValues: {
      rewards:
        project.rewards?.map((reward) => ({
          ...reward,
          deliveryStart: moment(reward.deliveryStart).format("YYYY-MM-DD") as unknown as Date,
          deliveryEnd: moment(reward.deliveryEnd).format("YYYY-MM-DD") as unknown as Date,
        })) ?? [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "rewards",
  });

  const handleValidSubmit: SubmitHandler<FormInput> = (data) => {
    const newData = produce(data, (draft) => {
      draft.rewards.forEach((reward) =>
        reward.items.forEach((item) => {
          // eslint-disable-next-line no-param-reassign
          if (typeof item.id === "string") delete item.id;
        })
      );
    });
    mutation.mutate({ id: project.id, rewards: newData.rewards });
  };

  const handleSelectReward = (rewardIdx: number) =>
    setSelected(rewardIdx !== selected ? rewardIdx : false);

  const handleAddReward = () => {
    append({
      title: "",
      price: 0,
      maxStock: 1,
      deliveryStart: new Date(),
      deliveryEnd: new Date(),
      description: "",
      items: [],
      stock: 1,
    });
  };
  const handleRemoveReward = (rewardIdx: number) => {
    remove(rewardIdx);
  };

  return (
    <>
      <S.FormTitle>Rewards</S.FormTitle>
      <hr className="mb-5" />
      <Button variant="outline" className="mb-3" onClick={handleAddReward}>
        Add New Reward
      </Button>

      <Form onSubmit={handleSubmit(handleValidSubmit)}>
        {fields.map((reward, rewardIdx) => (
          <React.Fragment key={reward.id}>
            <S.RewardToggle onClick={() => handleSelectReward(rewardIdx)}>
              <span>{reward.title}</span>
              <FontAwesomeIcon icon={selected === rewardIdx ? faCaretUp : faCaretDown} width={32} />
            </S.RewardToggle>

            <S.RewardCollapse in={selected === rewardIdx}>
              <Container className="my-1">
                <Row>
                  <Col md={12} lg={7} xl={8}>
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        {...register(`rewards.${rewardIdx}.title`, { required: true })}
                        placeholder="Beginner's pack"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        {...register(`rewards.${rewardIdx}.description`, {
                          required: true,
                        })}
                        placeholder="save money with beginner's pack"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        {...register(`rewards.${rewardIdx}.price`, {
                          required: true,
                        })}
                        type="number"
                        min="0"
                        step="any"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Stock</Form.Label>
                      <Form.Control
                        {...register(`rewards.${rewardIdx}.maxStock`, {
                          required: true,
                          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                            setValue(`rewards.${rewardIdx}.stock`, +e.target.value),
                        })}
                        type="number"
                        min="1"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Delievery Start</Form.Label>
                      <Form.Control
                        {...register(`rewards.${rewardIdx}.deliveryStart`, {
                          required: true,
                          valueAsDate: true,
                        })}
                        type="date"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Delievery End</Form.Label>
                      <Form.Control
                        {...register(`rewards.${rewardIdx}.deliveryEnd`, {
                          required: true,
                          valueAsDate: true,
                        })}
                        type="date"
                      />
                    </Form.Group>

                    <Form.Label
                      css={css`
                        display: block;
                      `}
                    >
                      Items
                    </Form.Label>
                    <FormRewardItems formProps={{ register, control }} rewardIdx={rewardIdx} />
                  </Col>

                  <S.RewardCardCol lg={5} xl={4}>
                    <RewardCard reward={watch(`rewards.${rewardIdx}`) as FindRewardResponseDto} />
                    <Button
                      variant="primary"
                      className="mt-4"
                      onClick={() => handleRemoveReward(rewardIdx)}
                    >
                      Remove Reward
                    </Button>
                  </S.RewardCardCol>
                </Row>
              </Container>
            </S.RewardCollapse>
          </React.Fragment>
        ))}

        <Button type="submit" variant="outline">
          Save Changes
        </Button>
      </Form>
    </>
  );
};

export default FormRewards;
